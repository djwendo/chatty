import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

export default class MessageList extends Component {

  render() {
    const individualMessage = this.props.messages.map((message) => {
      if (message.type === 'incomingMessage') {
        return (<Message
          key={message.id}
          username={message.username}
          content={message.content}
          color={message.color}/>);
      } else if (message.type === 'incomingNotification') {
        return <Notification key={message.id} content={message.content}/>;
      }
    });

    return (
      <main className="messages">
        <div id="message-list">
          {individualMessage}
        </div>
      </main>
    );
  }
}