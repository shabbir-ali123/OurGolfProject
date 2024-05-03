import io from "socket.io-client";

const SOCKET_IO_URL = "https://backend.golf-encounters.com:5000";
// const headers = {
//   "ngrok-skip-browser-warning": "69420",
//   "Access-Control-Allow-Origin": "*",

// };

const socket = io(SOCKET_IO_URL, {
  // extraHeaders: headers
});

export default socket;