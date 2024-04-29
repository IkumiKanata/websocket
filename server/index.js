"use strict";
const http = require("http");
const WebSocketServer = require("websocket").server;
// Create an HTTP server
const httpserver = http.createServer(() => {
    console.log("");
});
// Create a WebSocket server
const websocket = new WebSocketServer({
    httpServer: httpserver,
});
httpserver.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
// Event listener
websocket.on("request", (request) => {
    console.log(request);
    let connection = websocket.accept(null, request.origin);
    // connection.on("open", () => {
    //     console.log("Connection opened");
    // });
    // Event listener for when a client disconnects
    websocket.on("close", () => {
        console.log("Client disconnected");
    });
    websocket.on("message", (message) => {
        console.log("Received message: " + message.utf8Data);
        connection.send("Message received: " + message.utf8Data);
        //use connection.send to send stuff to the client
        sendevery5seconds();
    });
    const sendevery5seconds = () => {
        connection.send(`Message ${Math.random()}`);
        setTimeout(sendevery5seconds, 5000);
    };
});
