import alt from '../alt';

class ChatServerActions {
  constructor() {
    this.generateActions(
      'receiveCreatedMessage',
      'receiveCreatedMessageFailed',
      'receiveAll',
      'receiveAllFailed');
  }
}

module.exports = alt.createActions(ChatServerActions);
