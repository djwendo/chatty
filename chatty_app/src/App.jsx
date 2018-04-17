import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket('ws://localhost:3001//');
    console.log("Connected to server");

    this.socket.onmessage = (event) => {
      console.log('This event', event);

      const message = JSON.parse(event.data);
      console.log('message info:', message);

      const currentMessages = this.state.messages;
      const newMessages = [...currentMessages, {id: message.id, username: message.username , content: message.content}];
      this.setState({ messages: newMessages});
    }

    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages})
    }, 3000);
  }

  addMessage(message) {
      var msg = {
        type: "sendMessage",
        content: message,
        username: this.state.currentUser.name
      };
      console.log('message from client:', msg);
      this.socket.send(JSON.stringify(msg));
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser} submitMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;
