import React, {Component} from 'react';

export default class Navigation extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p className="navbar-usersOnline">{this.props.onlineUsers} users online</p>
      </nav>
    );
  }
}




