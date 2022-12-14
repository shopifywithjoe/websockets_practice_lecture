const express = require("express");
const socketio = require("socket.io");

const app = express();

// We only use express to serve the main client ( index.html )
// Express is NOT needed for socket.io or WebSockets in general

app.use(express.static("public"));

const http = app.listen(3000);


// Code below is socket.io related

// socket.io needs a http instance
const io = socketio(http); // this automatically creates a static script resource at location /socket.io/socket.io.js

io.on("connection", function(client) {
  console.log("A client has connected");

  client.on("newChat", function(chatMessage) {
    // Emit the chat message to all connected clients
    let newChat = {
      handle: client.x_handle,
      chat: chatMessage
    }

    io.emit("chat", newChat);
  })

  client.on("join", function(handle) {
    client.x_handle = handle;
  })

  client.on("disconnect", function() {
    console.log("A client has disconnected");
  })
})