import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
    this.newUsername = this.newUsername.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket('ws://localhost:3001//');
    console.log("Connected to server");

    this.socket.onmessage = (event) => {
      console.log('This event', event);

      const message = JSON.parse(event.data);
      console.log('message info:', message);

      switch(message.type) {
        case 'incomingMessage':
          const currentMessages = this.state.messages;
          const newMessages = [...currentMessages, {id: message.id, username: message.username , content: message.content, type: message.type}];
          this.setState({ messages: newMessages});
          break;
        case 'incomingNotification':
          const newNotifications = [...this.state.messages, {id: message.id, content: message.content, type: message.type}];
          this.setState({ messages: newNotifications});
          break;
        default:
          throw new Error("Unknown event type " + message.type);
      }
    }

    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!", type: 'incomingMessage'};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages})
    }, 3000);
  }

  newUsername(user) {
    console.log('I am currentUser', user);
    if (user !== this.state.currentUser.name) {
      this.socket.send(JSON.stringify({type: 'postNotification', content: `user ${this.state.currentUser.name} has changed their name to ${user}`}));
    }
    this.setState({ currentUser: {name: user}});
  }

  addMessage(user, message) {
      let msg = {
        type: "postMessage",
        content: message,
        username: user
      };
      console.log('message from client:', msg);
      this.socket.send(JSON.stringify(msg));
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.newUsername} addMessage={this.addMessage} username={this.state.currentUser.name}/>
      </div>
    );
  }
}
export default App;
