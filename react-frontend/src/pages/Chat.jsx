import { useEffect, useState } from "react";
import api from "../services/api";
import {
    socket,
    connectSocket,
    disconnectSocket
} from "../services/socket";
import "./Chat.css";

function Chat() {
    const [recipientId, setRecipientId] = useState("");
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [status, setStatus] = useState("Disconnected");
    const [error, setError] = useState("");

    const currentUserId = sessionStorage.getItem("userId");

    useEffect(() => {
        const handleConnect = () => setStatus("Connected");
        const handleDisconnect = () => setStatus("Disconnected");

        const handleNewMessage = (message) => {
            setMessages((prev) => [...prev, message]);
        };

        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);
        socket.on("new_message", handleNewMessage);

        connectSocket();

        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("new_message", handleNewMessage);
            disconnectSocket();
        };
    }, []);

    const loadHistory = async () => {
        if (!recipientId.trim()) {
            setError("Enter the recipient's user ID.");
            return;
        }

        try {
            setError("");

            const response = await api.get(
                `/chat/messages/${recipientId.trim()}`
            );

            setMessages(response.data.messages || []);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Could not load chat history."
            );
        }
    };

    const sendMessage = () => {
        if (!recipientId.trim() || !text.trim()) {
            setError("Enter a recipient ID and message.");
            return;
        }

        if (!socket.connected) {
            setError("Socket is disconnected. Please log in again.");
            return;
        }

        socket.emit(
            "send_message",
            {
                recipientId: recipientId.trim(),
                text: text.trim()
            },
            (response) => {
                if (response?.success) {
                    setMessages((prev) => [
                        ...prev,
                        response.message
                    ]);
                    setText("");
                    setError("");
                } else {
                    setError(
                        response?.message ||
                        "Message could not be sent."
                    );
                }
            }
        );
    };

    return (
        <div className="chat-page">
            <div className="chat-container">
                <header className="chat-header">
                    <h1>💬 Messages</h1>
                    <div
                        className={`chat-status ${
                            status === "Connected" ? "connected" : ""
                        }`}
                    >
                        ● {status}
                    </div>
                </header>

                <main className="chat-body">
                    <div className="chat-recipient">
                        <input
                            value={recipientId}
                            onChange={(e) =>
                                setRecipientId(e.target.value)
                            }
                            placeholder="Enter recipient's MongoDB user ID"
                        />

                        <button
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
                            messages.map((message) => {
                                const isSent =
                                    String(message.sender?._id || message.sender) ===
                                    String(currentUserId);

                                return (
                                    <div
                                        key={message._id}
                                        className={`chat-message ${
                                            isSent ? "sent" : "received"
                                        }`}
                                    >
                                        <strong>
                                            {isSent ? "You" : "Other user"}
                                        </strong>
                                        {message.text}
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <div className="chat-composer">
                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") sendMessage();
                            }}
                            placeholder="Write a message..."
                        />

                        <button
                            className="chat-button"
                            onClick={sendMessage}
                        >
                            Send ➤
                        </button>
                    </div>

                    {error && (
                        <div className="chat-error">{error}</div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Chat;