import * as WebSocket from "websocket";
import * as http from "http";

const WebSocketServer = WebSocket.server;

const server = http.createServer((request, response) => {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
server.listen(1337, undefined);

// create the server
const wsServer = new WebSocketServer({
  "httpServer": server
});

// WebSocket server
wsServer.on("request", (request) => {
  console.log("client connected");
  const connection = request.accept(undefined, request.origin);
  connection.send("hello world");

  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on("message", (message) => {
    if (message.type === "utf8") {
      console.log("got message: ", message.utf8Data);
      // process WebSocket message
    }
  });

  connection.on("close", (connection) => {
    // close user connection
  });
});

console.log("server started. waiting for connections");
