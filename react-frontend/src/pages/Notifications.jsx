
import { useEffect, useState } from "react";
import api from "../services/api";
import { socket, connectSocket } from "../services/socket";
import "./Notifications.css";

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await api.get("/chat/notifications");
                setNotifications(response.data.notifications || []);
            } catch (err) {
                setError("Unable to load notifications.");
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
        connectSocket();

        const handleNewNotification = (notification) => {
            setNotifications((previous) => [notification, ...previous]);
        };

        socket.on("new_notification", handleNewNotification);

        return () => {
            socket.off("new_notification", handleNewNotification);
        };
    }, []);

    const markAsRead = async (notificationId) => {
        try {
            await api.patch(
                "/chat/notifications/" + notificationId + "/read"
            );

            setNotifications((previous) =>
                previous.map((notification) =>
                    notification._id === notificationId
                        ? { ...notification, isRead: true }
                        : notification
                )
            );
        } catch (err) {
            setError("Unable to mark notification as read.");
        }
    };

    const unreadCount = notifications.filter(
        (notification) => !notification.isRead
    ).length;

    return (
        <div className="notifications-page">
            <div className="notifications-container">
                <div className="notifications-header">
                    <div>
                        <h1>Notifications</h1>
                        <p>Stay updated with your latest messages.</p>
                    </div>

                    <span className="notification-count">
                        {unreadCount} unread
                    </span>
                </div>

                {loading && (
                    <p className="notification-status">
                        Loading notifications...
                    </p>
                )}

                {error && (
                    <p className="notification-error">
                        {error}
                    </p>
                )}

                {!loading && !error && notifications.length === 0 && (
                    <div className="notifications-empty">
                        <h3>You're all caught up!</h3>
                        <p>New message notifications will appear here.</p>
                    </div>
                )}

                <div className="notifications-list">
                    {notifications.map((notification) => (
                        <div
                            key={notification._id}
                            className={
                                "notification-card " +
                                (notification.isRead ? "read" : "unread")
                            }
                        >
                            <div className="notification-icon">✉</div>

                            <div className="notification-content">
                                <p>{notification.message}</p>

                                <small>
                                    {new Date(
                                        notification.createdAt
                                    ).toLocaleString()}
                                </small>
                            </div>

                            {!notification.isRead && (
                                <button
                                    className="mark-read-button"
                                    onClick={() =>
                                        markAsRead(notification._id)
                                    }
                                >
                                    Mark as read
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Notifications;
