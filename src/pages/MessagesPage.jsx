
import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import PrivateChatWindow from '../components/PrivateChatWindow';
import Header from '../components/Header';
import { useSocket } from '../context/SocketContext';
import { getContacts } from '../services/userService'
import VideoCall from '../components/VideoCall';

const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
        <div className="relative w-full max-w-2xl rounded-lg bg-white p-4">
            <button onClick={onClose} className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-red-500 text-white">X</button>
            {children}
        </div>
    </div>
);


function MessagesPage() {

    const { user } = useAuth();
    const { subscribe, unsubscribe, isConnected, send } = useSocket();
    const [contacts, setContacts] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showVideoCall, setShowVideoCall] = useState(false);

    // This state will hold *all* conversations, keyed by username
    const [allMessages, setAllMessages] = useState(new Map());

    // State to hold an incoming call offer
    const [incomingCall, setIncomingCall] = useState(null);

    // fetch the contact list to load
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const userContacts = await getContacts();
                setContacts(userContacts);
            } catch (error) {
                console.error('Failed to fetch contacts', error);
            }
        };
        fetchContacts();
    }, []);


    // 2. Subscribe to *my* private message queue
    useEffect(() => {
        if (isConnected && user) {
            const privateQueue = `/user/queue/private`;

            const onPrivateMessage = (msg) => {
                // msg contains { sender, content, ... }
                const sender = msg.sender;
                setAllMessages(prevMap => {
                    const newMap = new Map(prevMap);
                    const oldMessages = newMap.get(sender) || [];
                    newMap.set(sender, [...oldMessages, msg]);
                    return newMap;
                });
            };

            const subIdPrivate = subscribe(privateQueue, onPrivateMessage);
            const signalQueue = `/user/queue/signal`;

            const onSignal = (signalMessage) => {
                if (signalMessage.type === 'offer') {
                    // This is an incoming call!
                    // Find out who is calling
                    const caller = contacts.find(c => c.username === signalMessage.sender);
                    if (caller) {
                        setIncomingCall(signalMessage); // Store the signal
                        setSelectedUser(caller); // Automatically select the caller
                        setShowVideoCall(true); // FORCE the modal to open
                    }
                }
            };
            const subIdSignal = subscribe(signalQueue, onSignal);

            return () => {
                if (subIdPrivate) unsubscribe(subIdPrivate);
                if (subIdSignal) unsubscribe(subIdSignal); // Unsubscribe from signals 
            };
        }
    }, [isConnected, user, subscribe, unsubscribe, contacts]);

    const closeCall = () => {
        setShowVideoCall(false);
        setIncomingCall(null);
        // We would also add logic here to end the peer connection
    };

    const handleSendMessage = (content, recipientUsername) => {
        if (!user) return;

        const chatMessage = {
            sender: user.sub,
            recipient: recipientUsername,
            content: content,
            type: 'PRIVATE'
        };

        // a. Send over WebSocket
        send('/app/chat.sendPrivateMessage', chatMessage);

        // b. Add our own message to the state so we see it instantly
        setAllMessages(prevMap => {
            const newMap = new Map(prevMap);
            const oldMessages = newMap.get(recipientUsername) || [];
            newMap.set(recipientUsername, [...oldMessages, chatMessage]);
            return newMap;
        });
    };

    return (
        <div className="flex h-screen flex-col">
            <Header />
            <div className="flex h-[calc(100vh-68px)]"> {/* Full height minus header */}
                {/* Left Column: Contact List */}
                <div className="w-1/3 border-r border-gray-200 bg-white">
                    <h2 className="border-b p-4 text-xl font-semibold">Contacts</h2>
                    <ul className="overflow-y-auto">
                        {contacts.map(contact => (
                            <li
                                key={contact.id}
                                onClick={() => setSelectedUser(contact)}
                                className={`cursor-pointer p-4 hover:bg-gray-100 ${selectedUser?.id === contact.id ? 'bg-blue-100' : ''}`}
                            >
                                <p className="font-medium">{contact.username} ({contact.role})</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Column: Chat Window */}
                <div className="w-2/3 bg-gray-50">
                    {selectedUser ? (
                        <div className='flex h-full flex-col'>

                            <div className="border-b bg-white p-2 text-center">
                                <button
                                    onClick={() => setShowVideoCall(true)}
                                    className="rounded-md bg-green-500 px-3 py-1 text-sm font-semibold text-white hover:bg-green-600"
                                >
                                    Start Video Call
                                </button>
                            </div>

                            <PrivateChatWindow
                                key={selectedUser.id} // Re-mounts component on user change
                                selectedUser={selectedUser}
                                messages={allMessages.get(selectedUser.username) || []}
                                onSendMessage={handleSendMessage}
                            />
                        </div>
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <p className="text-lg text-gray-500">Select a contact to start chatting.</p>
                        </div>
                    )}
                </div>
            </div>

            {showVideoCall && selectedUser && (
                <Modal onClose={closeCall}>
                    <VideoCall
                        recipient={selectedUser}
                        incomingCall={incomingCall} // Pass the call data in
                        onClose={closeCall}          // Pass the close handler
                    />
                </Modal>
            )}
            
        </div>
    );
}

export default MessagesPage