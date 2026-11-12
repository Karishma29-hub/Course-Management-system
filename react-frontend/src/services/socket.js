
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  auth: {
    token: sessionStorage.getItem("token")
  }
});

export const connectSocket = () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    console.error("No authentication token found.");
    return;
  }

  socket.auth = { token };
  socket.connect();
};

export const disconnectSocket = () => {
  socket.disconnect();
};