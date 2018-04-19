import React, {Component} from 'react';

const Notification = ({ content }) => (
  <div className="message system">
    <div className="notification">
      <span className="notification-content">{content}</span>
    </div>
  </div>
)

export default Notification;
