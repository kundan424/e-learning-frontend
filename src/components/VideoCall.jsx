import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useSocket } from '../context/SocketContext';
import Peer from 'simple-peer';

function VideoCall({ recipient, incomingCall, onClose }) {

    const { user } = useAuth();
    const { subscribe, send, isConnected, unsubscribe } = useSocket();

    const [stream, setStream] = useState(null); // Our local video stream
    const [peer, setPeer] = useState(null); // The peer connection
    const [callAccepted, setCallAccepted] = useState(false);

    const myVideo = useRef();
    const partnerVideo = useRef();

    const signalQueue = `/user/${user.sub}/queue/signal`;
    const sendDestination = '/app/signal.forward';

    // 1. Get user's camera and mic on load
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(currentStream => {
                setStream(currentStream);
                if (myVideo.current) {
                    myVideo.current.srcObject = currentStream;
                }
            })
            .catch(err => console.error('Error getting media:', err));
    }, []);

    // 2. Listen for incoming signals (offers, answers, candidates)
    useEffect(() => {
        if (isConnected && user) {
            const onSignalReceived = (signalMessage) => {
                if (signalMessage.type === 'answer' && peer) {
                    peer.signal(signalMessage.payload);
                }
            };

            const subId = subscribe(signalQueue, onSignalReceived);
            return () => { if (subId) unsubscribe(subId); };
        }
    }, [isConnected, user, subscribe, unsubscribe, signalQueue, peer]);

    // function to start call
    const startCall = () => {
        const newPeer = new Peer({
            initiator: true, // We are the one starting the call
            trickle: false, // Disables ICE trickle for simplicity
            stream: stream, // Our video/audio
        });

        // This event fires when the "offer" is ready
        newPeer.on('signal', (offer) => {
            const signalMessage = {
                sender: user.sub,
                recipient: recipient.username,
                type: 'offer',
                payload: offer,
            };
            send(sendDestination, signalMessage); // Send the offer via WebSocket
        });

        // This event fires when the *partner* stream is received
        newPeer.on('stream', (partnerStream) => {
            if (partnerVideo.current) {
                partnerVideo.current.srcObject = partnerStream;
            }
        });

        setPeer(newPeer);
        setCallAccepted(true);
    };


    // Function to *answer* an incoming call
    const answerCall = () => {
        const newPeer = new Peer({
            initiator: false, // We are *not* the one starting
            trickle: false,
            stream: stream,
        });

        // This event fires when the "answer" is ready
        newPeer.on('signal', (answer) => {
            const signalMessage = {
                sender: user.sub,
                recipient: incomingCall.sender, // Answer the person who called
                type: 'answer',
                payload: answer,
            };
            send(sendDestination, signalMessage);
        });

        // This event fires when the partner stream is received
        newPeer.on('stream', (partnerStream) => {
            if (partnerVideo.current) {
                partnerVideo.current.srcObject = partnerStream;
            }
        });

        // We signal with the "offer" we received
        newPeer.signal(incomingCall.payload); // Use the offer from the prop
        setPeer(newPeer);
        setCallAccepted(true);
    };

    return (
        <div className="flex h-full flex-col p-4">
            <h3 className="text-xl font-semibold">Video Call with {recipient.username}</h3>

            {/* Video Windows */}
            <div className="my-4 grid grid-cols-2 gap-4">
                <div>
                    <p className="font-medium">{user.sub} (You)</p>
                    <video playsInline muted ref={myVideo} autoPlay className="w-full rounded-lg bg-black" />
                </div>
                <div>
                    <p className="font-medium">{recipient.username}</p>
                    <video playsInline ref={partnerVideo} autoPlay className="w-full rounded-lg bg-black" />
                </div>
            </div>

            {/* Call Controls */}
            <div>
                {callAccepted ? (
                    <p className="text-green-600">Call in progress...</p>
                ) : incomingCall ? (
                    // Incoming call
                    <button
                        onClick={answerCall}
                        className="w-full rounded-lg bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
                    >
                        Answer Call from {recipient.username}
                    </button>
                ) : (
                    // No call, show "Start Call" button
                    <button
                        onClick={startCall}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
                    >
                        Start Video Call
                    </button>
                )}
                <button
                    onClick={onClose}
                    className="w-full rounded-lg bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
                >
                    Hang Up
                </button>
            </div>
        </div>
    );
}

export default VideoCall;