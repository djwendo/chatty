import React, {Component} from 'react';

export default class Navigation extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">CHATTY CANTINA</a>
        { (this.props.onlineUsers > 1) && <p className="navbar-usersOnline">{this.props.onlineUsers} USERS ONLINE</p> }
        { (this.props.onlineUsers === 1) && <p className="navbar-usersOnline">{this.props.onlineUsers} USER ONLINE</p> }
      </nav>
    );
  }
}




