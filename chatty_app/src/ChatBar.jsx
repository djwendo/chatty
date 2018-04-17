import React, {Component} from 'react';

export default class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

  }

  onSubmit(e) {
    if (e.keyCode === 13) {
      this.props.submitMessage(e.target.value);
      e.target.value = '';
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" name="yourName" type="text" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name}/>
        <input className="chatbar-message" onKeyUp={this.onSubmit} name="messageText" type="text" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
