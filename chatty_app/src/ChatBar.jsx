import React, {Component} from 'react';

export default class ChatBar extends Component {
  constructor(props) {
    super(props);
      this.state = {
        username: this.props.username,
      };

    this.onSubmit = this.onSubmit.bind(this);
    this.enterUsername = this.enterUsername.bind(this);
  }

  enterUsername(e) {
    if (e.target.value === '') {
      this.setState({
        username: 'Anonymous'
      })
    } else {
      this.setState({
        username: e.target.value
      });
    }
    this.props.currentUser(e.target.value);
  }

  onSubmit(e) {
    if (e.keyCode === 13) {
      this.props.addMessage(this.state.username, e.target.value);
      e.target.value = '';
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
          onBlur={this.enterUsername}
          name="yourName"
          type="text"
          placeholder="Your Name (Optional)"/>
        <input className="chatbar-message"
          onKeyUp={this.onSubmit}
          name="messageText"
          type="text"
          placeholder="Type a message and hit ENTER. To post images, use links ending in jpg, png, or gif."/>
      </footer>
    );
  }
}
