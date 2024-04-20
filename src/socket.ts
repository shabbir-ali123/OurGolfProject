import io from "socket.io-client";

const SOCKET_IO_URL = "https://shaggy-turtle-15.telebit.io";
// const headers = {
//   "ngrok-skip-browser-warning": "69420",
//   "Access-Control-Allow-Origin": "*",

// };

const socket = io(SOCKET_IO_URL, {
  // extraHeaders: headers
});

export default socket;