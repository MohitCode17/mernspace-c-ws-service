import { createServer } from "node:http";
import { Server } from "socket.io";
import config from "config";

const wsServer = createServer();

const ALLOWED_DOMAINS = [
  config.get("frontend.clientUI"),
  config.get("frontend.adminUI"),
];

const io = new Server(wsServer, {
  cors: { origin: ALLOWED_DOMAINS as string[] },
});

io.on("connection", (socket) => {
  // WHENEVER A CLIENT CONNECTS, THIS EVENT IS TRIGGERED.
  console.log("Client connected", socket.id);

  // LISTEN FOR CLIENT
  socket.on("join", (data) => {
    // THE CLIENT SENDS A 'JOIN' EVENT WITH A TENANTID
    socket.join(String(data.tenantId)); // THE CLIENT JOINS A SPECIFIC ROOM BASED ON TENANTID

    // console.log(io.of("/").adapter);

    socket.emit("join", { roomId: String(data.tenantId) }); // SENDING A RESPONSE TO CLIENT CONFIRMING THEY JOINED THE ROOM
  });
});

export default {
  wsServer,
  io,
};

// socket.on(event, callback) → Listening for events
// Used to listen for events emitted by the client or server.

// socket.emit(event, data) → Sending events
// Used to send an event with optional data to a client.
