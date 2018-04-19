import React, {Component} from 'react';

export default class Navigation extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty Cantina</a>
        { (this.props.onlineUsers > 1) && <p className="navbar-usersOnline">{this.props.onlineUsers} users online</p> }
        { (this.props.onlineUsers === 1) && <p className="navbar-usersOnline">{this.props.onlineUsers} user online</p> }
      </nav>
    );
  }
}




