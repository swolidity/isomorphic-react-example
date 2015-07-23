import ChatServerActions from '../actions/ChatServerActions';
import LoginStore from '../stores/LoginStore';
import http from 'axios';

const ChatSource = {
  getAllMessages: {
    remote(state, threadId) {
      return http.get('/api/chat/messages', {
        params: {
          threadId: threadId,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.data;
      });
    },

    local() {
      return null;
    },

    success: ChatServerActions.receiveAll,
    error: ChatServerActions.recieveAllFailed,

  },

  createMessage: {
    remote(state, text, threadId) {
      const token = LoginStore.getToken();

      return http.post('/api/chat/messages', {
        text: text,
        threadId: threadId,
      },
      {
        headers: { 'Authorization': 'JWT ' + token  },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return Promise.reject(err.data);
      });
    },

    local() {
      return null;
    },

    success: ChatServerActions.receiveCreatedMessage,
    error: ChatServerActions.recieveCreatedMessageFailed,
  },
};

module.exports = ChatSource;
