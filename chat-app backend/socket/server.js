const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 }, () => {
  console.log("websocket connected!!!");
});

server.on("connection", (ws) => {
  console.log("new client connected!");

  //welcome message
  console.log("Chat application working...");

  //reply to all clients
  ws.on("message", (message) => {
    // console.log(`message recieved, ${message.toJSON}`);
    try {
      const jsonMessage = JSON.parse(message);
      //to broadcast the message to all users
      server.clients.forEach(
        (each = (client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(jsonMessage));
          }
        })
      );
    } catch (e) {
      console.log("error", e);
    }
  });

  //to handle close request
  ws.on("close", (close) => {
    console.log("websocket connection closed");
  });
});
