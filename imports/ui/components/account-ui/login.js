//meteor core
import { Meteor } from 'meteor/meteor';

//react core
import React, { Component } from 'react';
import { render } from 'react-dom';
import { createContainer } from 'react-meteor-data';
import { FlowHelpers } from '/imports/api/utils/client/utils.js';

import EmailPasswordForm from './emailPasswordForm.js';

class Login extends Component {
  loginWithPassword(e) {
    e.preventDefault();

    const email = $('#email').val(),
      password = $('#password').val().trim();

    Meteor.loginWithPassword(email, password, error => {
      if (error) {
        console.log('There was an error:' + error.reason);
      } else {
        FlowRouter.go('dashboard');
      }
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h1>Login</h1>
          {this.props.registerLink}

          <EmailPasswordForm submitBtnLabel="Login" submitAction={this.loginWithPassword} />
        </div>
      </div>
    );
  }
}
//

export default createContainer(() => {
  let registerMsg = "Don't have an account? ";
  const registerLink = (
    <p>
      {registerMsg}
      <a href={FlowHelpers.pathFor('register')}>Register</a>
    </p>
  );

  return { registerLink };
}, Login);
