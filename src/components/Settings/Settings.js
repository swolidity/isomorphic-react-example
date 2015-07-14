import React from 'react';
import { RouteHandler } from 'react-router';
import Authenticated from '../../decorators/Authenticated';

class Settings extends React.Component {

  render() {
    return (
      <RouteHandler />
    );
  }
}

module.exports = Authenticated(Settings);
