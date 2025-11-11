import { createContext, useState, useContext, useEffect, useRef } from "react";
import { useAuth } from '../hooks/useAuth'
import SockJS from 'sockjs-client'
import { Client } from "@stomp/stompjs";


const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { user, token } = useAuth();
    const [stompClient, setStompClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    // Use a ref to store subscriptions to avoid re-subscribing on re-renders
    const subscriptions = useRef(new Map());

    useEffect(() => {
        if (user) {
            const client = new Client({
                webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
                connectHeaders: {
                    Authorization: `Bearer ${token}`,
                },
                reconnectDelay: 5000, // Auto reconnect after 5s
                
                debug: (msg) => {
                    console.log('STOMP DEBUG:', msg);
                }, // Disable logging
                
                onConnect: (frame) => {
                    console.log('STOMP connected:', frame);
                    setIsConnected(true);
                    setStompClient(client);
                },

                onStompError: (frame) => {
                    console.error('STOMP error:', frame);
                    setIsConnected(false);
                },

                onDisconnect: () => {
                    console.log('STOMP disconnected');
                    setIsConnected(false);
                },
            });

            client.activate();

            return () => {
                client.deactivate();
                setIsConnected(false);
                setStompClient(null);
                subscriptions.current.clear();
            };
        }
    }, [user, token]);

    const subscribe = (destination, callback) => {
        if (!stompClient || !isConnected) return null;
        if (subscriptions.current.has(destination)) return null;

        const sub = stompClient.subscribe(destination, (message) => {
            callback(JSON.parse(message.body));
        });

        subscriptions.current.set(destination, sub);
        return destination;
    };

    const unsubscribe = (destination) => {
        const sub = subscriptions.current.get(destination);
        if (sub) {
            sub.unsubscribe();
            subscriptions.current.delete(destination);
        }
    };

    const send = (destination, body) => {
        if (stompClient && isConnected) {
            stompClient.publish({ destination, body: JSON.stringify(body) });
        }
    };

    return (
        <SocketContext.Provider value={{ subscribe, unsubscribe, send, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => {
    return useContext(SocketContext)
}

