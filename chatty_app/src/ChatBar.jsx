import React, {Component} from 'react';

export default class ChatBar extends Component {
  constructor(props) {
    super(props);
      this.state = {
        username: this.props.username,
        message: ''
      };

    this.onSubmit = this.onSubmit.bind(this);
    this.enterUsername = this.enterUsername.bind(this);
  }

  enterUsername(e) {
    this.setState({
      username: e.target.value
    });
    if (e.keyCode === 13) {
      this.props.currentUser(e.target.value);
    }

  }

  onSubmit(e) {
    if (e.keyCode === 13) {
      this.props.addMessage(this.state.username, e.target.value);
      e.target.value = '';
    }
    this.setState({
      message: e.target.value
    });
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
          onChange={this.enterUsername}
          onKeyUp={this.enterUsername}
          name="yourName"
          type="text"
          placeholder="Your Name (Optional)"/>
        <input className="chatbar-message"
          onKeyUp={this.onSubmit}
          name="messageText"
          type="text"
          placeholder="Type a message and hit ENTER"/>
      </footer>
    );
  }
}
