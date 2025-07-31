// Import the Socket.IO client library
import { io } from "socket.io-client";

// Connect to the backend Socket.IO server at localhost:5000
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
const socket = io(SOCKET_URL);

// Export the socket instance for use throughout the app
export default socket;
