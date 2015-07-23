import React from 'react';
import MessageSection from '../MessageSection/MessageSection';
// import LoginStore from '../../stores/LoginStore';

class Chat extends React.Component {

  render() {
    return (
      <div className="Chat">
        <div className="container">
          <MessageSection threadId="55afcab0e9cb8531ef56de9d" />
        </div>
      </div>
    );
  }

}

module.exports = Chat;
