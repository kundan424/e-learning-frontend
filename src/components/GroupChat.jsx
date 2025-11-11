
import React from 'react'
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../hooks/useAuth';
import { useRef, useState, useEffect } from 'react';

function GroupChat({ courseId }) {
  const { user } = useAuth();
  const { subscribe, unsubscribe, send, isConnected } = useSocket();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null); // To auto-scroll

  const chatTopic = `/topic/course/${courseId}`;
  const sendDestination = `/app/chat.sendMessage/${courseId}`;

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isConnected) {
      const onMessageReceived = (msg) => {
        // Handle both CHAT and ANNOUNCEMENT types
        setMessages(prevMessages => [...prevMessages, msg]);
      };

      const subId = subscribe(chatTopic, onMessageReceived);

      // Cleanup function to unsubscribe when component unmounts
      return () => {
        if (subId) {
          unsubscribe(subId);
        }
      };
    }
  }, [isConnected, courseId, subscribe, unsubscribe, chatTopic]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && user) {
      const chatMessage = {
        sender: user.sub,
        content: newMessage,
        type: 'CHAT'
      };
      send(sendDestination, chatMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-[500px] flex-col">

      {/* Message List */}
      <div className="flex-grow overflow-y-auto rounded-t-lg border border-gray-300 bg-gray-50 p-4">
        {messages.length === 0 && (
          <p className="text-center text-gray-500">No messages yet. Start the conversation!</p>
        )}

        <ul className="space-y-4">
          {messages.map((msg, index) => (
            // We removed the 'ANNOUNCEMENT' check
            <li key={index} className={`flex ${msg.sender === user.sub ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-lg px-4 py-2 ${msg.sender === user.sub ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                <strong className="block text-sm">{msg.sender === user.sub ? 'You' : msg.sender}</strong>
                <p>{msg.content}</p>
              </div>
            </li>
          ))}
        </ul>

        <div ref={messagesEndRef} />
      </div>
          
      {/* Message Input Form */}
      <form onSubmit={handleSendMessage} className="flex rounded-b-lg border border-t-0 border-gray-300">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow rounded-bl-lg border-none p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!isConnected}
        />

        <button
          type="submit"
          className="rounded-br-lg bg-blue-600 px-6 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          disabled={!isConnected || !newMessage.trim()}
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default GroupChat;