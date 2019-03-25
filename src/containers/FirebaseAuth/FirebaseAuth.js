import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import fire from '../../config/fire';
import LoginForm from '../LoginForm/LoginForm';
import withContext from '../Hoc/withContext';

class FirebaseAuth extends Component {
  componentDidMount() {
    console.log('Called inside componentDidMount');
    this.authListener();
  }

  authListener() {
    console.log('value of Props in FirebaseAuth ', this.props);
    const { history } = this.props;
    const { changeLoginState, updateUser } = this.props.val;
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        const { uid } = user;
        changeLoginState(true);
        updateUser(user, uid);
        history.push('/home');
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

export default withContext(withRouter(FirebaseAuth));
