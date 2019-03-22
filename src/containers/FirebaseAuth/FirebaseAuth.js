import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import fire from '../../config/fire';
import LoginForm from '../LoginForm/LoginForm';
import withContext  from '../Hoc/withContext';

class FirebaseAuth extends Component {
  componentDidMount() {
    this.authListener();
  }

  authListener() {
    console.log(this.props);
    console.log(this.props.val);
    // console.log(this.val);
    // console.log('value of props in firebase sent by consumer', this.props.value);
    const { changeLoginState, updateUser } = this.props.val;
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        changeLoginState(true);
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

// export withRouter(FirebaseAuth);

export default withContext(FirebaseAuth);
