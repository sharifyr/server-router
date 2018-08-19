import * as WebSocket from "websocket";
import * as http from "http";

var WebSocketServer = WebSocket.server;
console.log('server started. waiting for connections');
var server = http.createServer(function(request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
server.listen(1337, function() { });

// create the server
var wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
  console.log('client connected')
  var connection = request.accept(undefined, request.origin);

  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log('got message: ', message.utf8Data)
      // process WebSocket message
    }
  });

  connection.on('close', function(connection) {
    // close user connection
  });
});