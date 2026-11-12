
import { useEffect, useState } from "react";
import api from "../services/api";
import { createSocket } from "../api/socketClient";
import "../pages/Chat.css";

function Chat() {
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);
    const [recipientId, setRecipientId] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState("");

    const currentUserId = sessionStorage.getItem("userId");

    useEffect(() => {
        const client = createSocket();

        client.on("connect", () => {
            setConnected(true);
            setError("");
        });

        client.on("disconnect", () => {
            setConnected(false);
        });

        client.on("connect_error", (err) => {
            setError(err.message);
            setConnected(false);
        });

        client.on("receive_message", (data) => {
            setMessages((previous) => {
                const selectedRecipient = recipientId.trim();

                const belongsToConversation =
                    (
                        String(data.sender) === String(currentUserId) &&
                        String(data.recipient) === selectedRecipient
                    ) ||
                    (
                        String(data.sender) === selectedRecipient &&
                        String(data.recipient) === String(currentUserId)
                    );

                if (!belongsToConversation) return previous;

                if (previous.some((item) => item._id === data._id)) {
                    return previous;
                }

                return [...previous, data];
            });
        });

        client.connect();
        setSocket(client);

        return () => {
            client.disconnect();
        };
    }, [currentUserId, recipientId]);

    async function loadHistory() {
        if (!recipientId.trim()) {
            setError("Enter the recipient's user ID.");
            return;
        }

        try {
            setError("");

            const response = await api.get(
                `/messages/${recipientId.trim()}`
            );

            setMessages(response.data.messages || []);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to load message history."
            );
        }
    }

    function sendMessage(event) {
        event.preventDefault();

        if (!recipientId.trim() || !message.trim()) {
            setError("Enter a recipient ID and message.");
            return;
        }

        if (!socket || !connected) {
            setError("Socket is disconnected. Please try again.");
            return;
        }

        socket.emit(
            "send_message",
            {
                recipientId: recipientId.trim(),
                text: message.trim()
            },
            (result) => {
                if (result.success) {
                    setMessage("");
                    setError("");
                } else {
                    setError(result.message);
                }
            }
        );
    }

    return (
        <div className="chat-page">
            <div className="chat-container">

                <header className="chat-header">
                    <h1>💬 Messages</h1>

                    <div className={`chat-status ${connected ? "connected" : ""}`}>
                        ● {connected ? "Connected" : "Disconnected"}
                    </div>
                </header>

                <main className="chat-body">

                    <div className="chat-recipient">
                        <input
                            value={recipientId}
                            onChange={(e) => {
                                setRecipientId(e.target.value);
                                setMessages([]);
                            }}
                            placeholder="Enter recipient's MongoDB user ID"
                        />

                        <button
                            type="button"
                            className="chat-button"
                            onClick={loadHistory}
                        >
                            Load History
                        </button>
                    </div>

                    <div className="chat-history">
                        {messages.length === 0 ? (
                            <div className="chat-empty">
                                <div style={{ fontSize: "32px" }}>✉️</div>
                                <p>Your conversation will appear here.</p>
                            </div>
                        ) : (
                            messages.map((item) => {
                                const isSent =
                                    String(item.sender?._id || item.sender) ===
                                    String(currentUserId);

                                return (
                                    <div
                                        key={item._id}
                                        className={`chat-message ${isSent ? "sent" : "received"}`}
                                    >
                                        <strong>
                                            {isSent ? "You" : "Other user"}
                                        </strong>

                                        {item.text}
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <form className="chat-composer" onSubmit={sendMessage}>
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write a message..."
                            maxLength={2000}
                            required
                        />

                        <button
                            type="submit"
                            className="chat-button"
                            disabled={!connected}
                        >
                            Send ➤
                        </button>
                    </form>

                    {error && (
                        <div className="chat-error" role="alert">
                            {error}
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}

export default Chat;
