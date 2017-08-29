//meteor core
import { Meteor } from 'meteor/meteor';

//react core
import React, { Component } from 'react';
import { render } from 'react-dom';
import { createContainer } from 'react-meteor-data';
import { FlowHelpers } from '/imports/api/utils/client/utils.js';
import EmailPasswordForm from './emailPasswordForm.js';

class Register extends Component {
  createUser(e) {
    e.preventDefault();
    const email = $('#email').val(),
      password = $('#password').val().trim();

    Accounts.createUser(
      {
        email: email,
        password: password
      },
      error => {
        if (error) {
          console.log('there was an error: ' + error.reason);
        } else {
          FlowRouter.go('dashboard');
        }
      }
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h1>Register</h1>
          <EmailPasswordForm submitBtnLabel="Register" submitAction={this.createUser} />
          {this.props.loginLink}
        </div>
      </div>
    );
  }
}
//

export default createContainer(() => {
  let loginMsg = 'Already have an account? ';
  const loginLink = (
    <p>
      {loginMsg}
      <a href={FlowHelpers.pathFor('login')}>Sign In</a>
    </p>
  );

  return {
    loginLink
  };
}, Register);
