import io from "socket.io-client";

const SOCKET_IO_URL = "http://18.216.79.130:5000";
const socket = io(SOCKET_IO_URL);

export default socket;