import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navigation from './Navigation.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: [],
      onlineUsers: '',
    };
    this.addMessage = this.addMessage.bind(this);
    this.newUsername = this.newUsername.bind(this);
  }

  componentDidMount() {

    this.socket = new WebSocket('ws://localhost:3001//');

    this.socket.onmessage = (event) => {

      const message = JSON.parse(event.data);
      const currentMessages = this.state.messages;

      switch(message.type) {
        case 'incomingMessage':
          const newMessages = [...currentMessages, { id: message.id, username: message.username, color: message.messageColor, content: message.content, type: message.type }];
          this.setState({ messages: newMessages });
          break;
        case 'incomingNotification':
          const newNotifications = [...currentMessages, { id: message.id, content: message.content, type: message.type }];
          this.setState({ messages: newNotifications });
          break;
        case 'onlineUsers':
          this.setState({ onlineUsers: message.onlineUsers });
          break;
        default:
          throw new Error("Unknown event type " + message.type);
      }
    }

    setTimeout(() => {
      const newMessage = {id: 1977, username: "Yoda", color: "#80BA27", content: "In the Chatty Cantina you are, young padawan", type: 'incomingMessage'};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages})
    }, 2000);
  }

  newUsername(user) {
    if (user === '') {
      user = 'Anonymous';
    }
    if (user !== this.state.currentUser.name) {
      this.socket.send(JSON.stringify({type: 'postNotification', content: `${this.state.currentUser.name} has changed their name to ${user}`}));
    }
    this.setState({ currentUser: {name: user}});
  }

  addMessage(user, message) {
    let msg = {
      type: "postMessage",
      content: message,
      username: user,
    };
    this.socket.send(JSON.stringify(msg));
  }

  render() {
    return (
      <div>
      <Navigation onlineUsers={this.state.onlineUsers}/>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.newUsername} addMessage={this.addMessage} username={this.state.currentUser.name}/>
      </div>
    );
  }
}
export default App;
