import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import fire from '../../config/fire';
import LoginForm from '../LoginForm/LoginForm';
import withContext from '../Hoc/withContext';

class FirebaseAuth extends Component {
  componentDidMount() {
    this.authListener();
  }

  authListener() {
    const { history } = this.props;
    const { changeLoginState, updateUser } = this.props.val;
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        changeLoginState(true);
        updateUser(user);
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

// export default withContext(FirebaseAuth);
