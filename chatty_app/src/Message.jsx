import React, {Component} from 'react';

export default class Message extends Component {

  render() {
    let color = this.props.color;

    return (
        <div className="message">
          <span className="message-username" style={{color: color}}>{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
    );
  }
}

