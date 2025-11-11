import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getMyNotifications } from "../services/notificationService"
import { useSocket } from "../context/SocketContext"
import { markNotificationAsRead } from "../services/notificationService"

const BellIcon = ({ count }) => {
    return (
        <div className="relative cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-gray-600 hover:text-gray-800">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a4.5 4.5 0 01-8.714 0M6 18.75a3 3 0 006 0m-6 0V11.25a5.25 5.25 0 015.25-5.25h1.5a5.25 5.25 0 015.25 5.25v7.5m-6 0h6M6 18.75h6" />
            </svg>
            {count > 0 && (
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {count}
                </span>
            )}
        </div>
    )
}

function parseJavaDate(dateTimeArray) {
    if (!Array.isArray(dateTimeArray) || dateTimeArray.length < 6) {
        return new Date(); // Return a default
    }
    // from [YYYY, MM, DD, HH, MM, SS]
    // JS Date is (YYYY, MM-1, DD, HH, MM, SS)
    // The month is 0-indexed in JS (0=Jan), but 1-indexed in Java.
    return new Date(
        dateTimeArray[0],     // Year
        dateTimeArray[1] - 1, // Month (0-indexed)
        dateTimeArray[2],     // Day
        dateTimeArray[3],     // Hour
        dateTimeArray[4],     // Minute
        dateTimeArray[5]      // Second
    );
}

function NotificationBell() {
    const { user } = useAuth();
    const { subscribe, unsubscribe, isConnected } = useSocket();
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    // fetch the historical notification on load
    useEffect(() => {
        if (!user) return; // if not logged in don't fetch 

        const fetchHistory = async () => {
            try {
                const history = await getMyNotifications();
                setNotifications(history);
                const unread = history.filter(n => !n.read).length;
                setUnreadCount(unread);
            } catch (error) {
                console.error("Failed to fetch notification history", error);
            }
        };
        fetchHistory();

    }, [user]);

    // Listen for *new* live pings

    useEffect(() => {
        if (isConnected && user) {
            const destination = `/user/${user.sub}/queue/notifications`;

            const onPingReceived = (newNotification) => {
                // Add the new notification to the top of the list
                setNotifications(prev => [newNotification, ...prev]);
                setUnreadCount(prev => prev + 1);
                // You could play a sound here
            };

            const subId = subscribe(destination, onPingReceived);
            return () => { if (subId) unsubscribe(subId); };

        }
    }, [isConnected, user, subscribe, unsubscribe])

    // handle clicking on notification
    const handleNotificationClick = async (notification) => {
        console.log("notification : " , notification);
        if (!notification.read) {
            try {
                await markNotificationAsRead(notification.id);
                // Update state locally
                setUnreadCount(prev => (prev > 0 ? prev - 1 : 0));
                setNotifications(prev =>
                    prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
                );
            } catch (err) {
                console.error("Failed to mark as read", err);
            }
        }
        // navigate to the link
        setIsOpen(false);
        navigate(notification.link);
        console.log("notification navigates to : ", notification.link);
    };

    return (
        <div className="relative">
            <div onClick={() => setIsOpen(!isOpen)}>
                <BellIcon count={unreadCount} />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-lg bg-white shadow-xl z-50">
                    <div className="border-b border-gray-200 p-3">
                        <h3 className="font-semibold text-gray-800">Notifications</h3>
                    </div>
                    <ul className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <li className="p-4 text-center text-gray-500">You have no notifications.</li>
                        ) : (
                            notifications.map(notif => (
                                <li
                                    key={notif.id}
                                    onClick={() => handleNotificationClick(notif)}
                                    className={`cursor-pointer border-b border-gray-100 p-4 hover:bg-gray-50 ${!notif.read ? 'bg-blue-50' : ''}`}
                                >
                                    <p className={`text-sm text-gray-700 ${!notif.read ? 'font-bold' : 'font-normal'}`}>
                                        {notif.message}
                                    </p>
                                    <span className="text-xs text-blue-500">
                                        {parseJavaDate(notif.createdAt).toLocaleString()}
                                    </span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default NotificationBell;