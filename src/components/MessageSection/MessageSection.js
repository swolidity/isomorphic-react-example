import MessageComposer from '../MessageComposer/MessageComposer';
import MessageListItem from '../MessageListItem/MessageListItem';
import MessageStore from '../../stores/MessageStore';
import React from 'react';

class MessageSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = MessageStore.getState();
  }

  componentDidMount() {
    this._scrollToBottom();
    MessageStore.listen(this._onChange);

    setInterval(() => {
      MessageStore.getAllMessages(this.props.threadId);
    }, 1000);
  }

  componentDidUpdate() {
    this._scrollToBottom();
  }

  componentWillUnmount() {
    MessageStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
    this.setState(state);
  }

  _scrollToBottom = () => {
    const ul = this.refs.messageList.getDOMNode();
    ul.scrollTop = ul.scrollHeight;
  }

  _getMessageListItem = (message) => {
    return (
      <MessageListItem
        key={message._id}
        message={message}
      />
    );
  }

  render() {
    let messageListItems;

    if (!this.state.messages.length) {
      messageListItems = <img src="/spinner.gif" />;
    } else {
      messageListItems = this.state.messages.map(this._getMessageListItem);
    }

    return (
      <div className="message-section">
        <h3 className="message-thread-heading">Thread Name</h3>
        <ul className="message-list" ref="messageList">
          {messageListItems}
        </ul>
        <MessageComposer threadId={this.props.threadId} />
      </div>
    );
  }
}

MessageSection.propTypes = { threadId: React.PropTypes.string };

module.exports = MessageSection;
