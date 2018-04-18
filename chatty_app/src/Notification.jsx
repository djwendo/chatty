import React, {Component} from 'react';

export default class Notification extends Component {
  render() {
    return (
      <div className="message system">
        <div className="notification">
          <span className="notification-content">{this.props.content}</span>
        </div>
      </div>
    );
  }
}

