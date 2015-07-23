import React from 'react';
import MessageStore from '../../stores/MessageStore';

const ENTER_KEY_CODE = 13;

class MessageComposer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: props.text };
  }

  _onChange = (e) => {
    this.setState({text: e.target.value});
  }

  _onKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      const text = this.state.text.trim();
      if (text) {
        MessageStore.createMessage(text, this.props.threadId);
      }
      this.setState({text: ''});
    }
  }

  render() {
    return (
      <textarea
        className="message-composer"
        name="message"
        value={this.state.text}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
      />
    );
  }

}

MessageComposer.defaultProps = { text: '' };

module.exports = MessageComposer;
