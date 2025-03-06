import { WebSocket } from "ws";

const wsClient = new WebSocket("ws://localhost:8080");

wsClient.on("open", () => {
  console.log("Connected to server");
  wsClient.send("Hello from client");

  wsClient.on("message", (message) => {
    console.log(`Received message:${message}`);
  });
});
