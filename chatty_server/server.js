// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log('client', wss.clients.value);
  let onlineUsers = wss.clients.size;
  let type = 'onlineUsers';
  let onlineMessage = {onlineUsers, type};
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(onlineMessage));
    }
  });
  console.log(`${wss.clients.size} users online`)

  ws.on('message', (msg) => {
    const id = uuidv4();
    let msgObject = JSON.parse(msg);
    if (msgObject.type === 'postMessage') {
      msgObject.type = 'incomingMessage';
    } else if (msgObject.type === 'postNotification') {
      msgObject.type = 'incomingNotification';
    }
    const msgToSendToUsers = {...msgObject, id};

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(msgToSendToUsers));
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    console.log(wss.clients.size);
    onlineUsers = wss.clients.size;
    type = 'onlineUsers';
    onlineMessage = {onlineUsers, type};
    wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(onlineMessage));
    }
  });
  });
});

