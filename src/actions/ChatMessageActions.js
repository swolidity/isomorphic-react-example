import alt from '../alt';

class ChatMessageActions {
  createMessage(text, threadId) {
    this.dispatch(text);
  }
}

module.exports = alt.createActions(ChatMessageActions);
