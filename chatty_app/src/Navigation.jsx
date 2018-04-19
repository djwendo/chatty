import React, {Component} from 'react';

const Navigation = ({ onlineUsers = 0}) => (
  <nav className="navbar">
    <a href="/" className="navbar-brand">CHATTY CANTINA</a>
    <p className="navbar-usersOnline">{ `${onlineUsers} ${ onlineUsers === 1 ? 'user' : 'users'} online` }</p>
  </nav>
)

export default Navigation;