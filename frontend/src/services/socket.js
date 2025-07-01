// Import the Socket.IO client library
import { io } from "socket.io-client";

// Connect to the backend Socket.IO server at localhost:5000
const socket = io("http://localhost:5000");

// Export the socket instance for use throughout the app
export default socket;
