import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import fire from '../../config/fire';
import LoginForm from '../LoginForm/LoginForm';

class FirebaseAuth extends Component {
  componentDidMount() {
    this.authListener();
  }

  authListener() {
    const { changeLoginState, updateUser } = this.props;
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        changeLoginState(true, this.props);
        updateUser(user);
      } else {
        changeLoginState(false);
        updateUser(null);
      }
    });
  }

  render() {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
}

export default withRouter(FirebaseAuth);
