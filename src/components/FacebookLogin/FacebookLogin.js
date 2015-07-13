var React = require('react');
import { ButtonInput } from 'react-bootstrap';
require('./FacebookLogin.scss');

// TODO: convert to ES6+ class
module.exports = React.createClass({

    getDefaultProps: function() {
      return {
        appId: "734303920015273",
        class: "facebook-login",
        scope: "public_profile, email"
      }
    },

    render: function() {

      return (
        <div>
          <ButtonInput className={ 'FacebookLogin ' + this.props.class } onClick={ this.handleClick }>
              { this.props.callToAction ? this.props.callToAction : "Login with Facebook"}
          </ButtonInput>
          <div id="fb-root"></div>
        </div>
      )
    },

    responseApi: function( authResponse ) {

      FB.api('/me', function(response) {

        response.status = 'connected';
        response.accessToken = authResponse.accessToken;
        response.expiresIn = authResponse.expiresIn;
        response.signedRequest = authResponse.signedRequest;

        if ( this.props.loginHandler ) {
          this.props.loginHandler( response );
        }


      }.bind(this));
    },

    checkLoginState: function(response) {
      if (response.authResponse) {

        this.responseApi(response.authResponse);

      } else {

        if ( this.props.loginHandler ) {
          this.props.loginHandler( { status: response.status } );
        }

      }
    },

    handleClick: function() {
      var valueScope = this.props.scope || 'public_profile, email, user_birthday';

      FB.login(this.checkLoginState, { scope: valueScope });
    }
});
