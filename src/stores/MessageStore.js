import alt from '../alt';

import ChatServerActions from '../actions/ChatServerActions';
import ChatMessageActions from '../actions/ChatMessageActions';
import ChatSource from '../sources/ChatSource';

class MessageStore {
  constructor() {
    this.bindActions(ChatMessageActions);
    this.bindActions(ChatServerActions);

    this.messages = [];

    this.exportAsync(ChatSource);
  }

  onReceiveAll(messages) {
    this.messages = messages;
  }

}

module.exports = alt.createStore(MessageStore, 'MessageStore');
