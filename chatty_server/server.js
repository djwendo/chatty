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

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

const assignUserColor = () => {
  const colors = ['#8E44AD', '#48C9B0', '#F39C12', '#3498DB'];
  const randomNumber = Math.floor(Math.random() * (colors.length));
  return colors[randomNumber];
}

let lastID = 0;

const getID = () => {
  const userID = lastID + 1;
  lastID = userID;
  return userID;
}

const usersOnline = {}

const usersOnlineCount = () => {
  wss.broadcast(JSON.stringify({
    onlineUsers: wss.clients.size,
    type: 'onlineUsers',
  }));
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  usersOnlineCount();
  ws.id = getID();
  usersOnline[ws.id] = assignUserColor();
  console.log(usersOnline);
  console.log(`${wss.clients.size} users online`)

  ws.on('message', (msg) => {
    messageColor = usersOnline[ws.id];
    console.log('each user color:', messageColor);
    const id = uuidv4();
    let msgObject = JSON.parse(msg);
    if (msgObject.type === 'postMessage') {
      msgObject.type = 'incomingMessage';
    } else if (msgObject.type === 'postNotification') {
      msgObject.type = 'incomingNotification';
    }
    const msgToSendToUsers = {...msgObject, id, messageColor};

    wss.broadcast(JSON.stringify(msgToSendToUsers));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    console.log(`${wss.clients.size} users online`)
    usersOnlineCount();
  });
});

