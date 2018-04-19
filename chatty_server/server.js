const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Random color generator for assigning colors to connected users
const assignUserColor = () => {
  const colors = ['#8E44AD', '#48C9B0', '#F39C12', '#3498DB', '#e81f3f', '#11aac4', '#de94e4'];
  const randomNumber = Math.floor(Math.random() * (colors.length));
  return colors[randomNumber];
}

// Set a user ID for all connected users to track colors
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
  usersOnlineCount();
  ws.id = getID();
  usersOnline[ws.id] = assignUserColor();

  ws.on('message', (msg) => {
    messageColor = usersOnline[ws.id];
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

// When a user disconnects, number of online users decreases and user/user color
// is removed from usersOnline
  ws.on('close', () => {
    usersOnlineCount();
    delete usersOnline[ws.id];
  });
});

