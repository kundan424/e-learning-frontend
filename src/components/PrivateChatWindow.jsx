import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'


function PrivateChatWindow({ selectedUser, messages, onSendMessage }) {

    const { user } = useAuth();
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    const handleSend = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            // Call the parent's send function
            onSendMessage(newMessage, selectedUser.username);
            setNewMessage('');
        }
    };



    return (
        <div className="flex h-full flex-col">
            {/* Header */}
            <div className="border-b border-gray-200 bg-white p-4 shadow-sm">
                <h2 className="text-xl font-semibold">{selectedUser.username}</h2>
                <p className="text-sm text-gray-500">{selectedUser.role}</p>
            </div>

            {/* Message List */}
            <div className="flex-grow overflow-y-auto p-4">
                <ul className="space-y-4">
                    {messages.map((msg, index) => (
                        <li
                            key={index}
                            className={`flex ${msg.sender === user.sub ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs rounded-lg px-4 py-2 ${msg.sender === user.sub
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-800'
                                    }`}
                            >
                                <p>{msg.content}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input Form */}
            <form onSubmit={handleSend} className="flex border-t border-gray-200 bg-white p-4">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow rounded-l-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="rounded-r-lg bg-blue-600 px-6 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default PrivateChatWindow