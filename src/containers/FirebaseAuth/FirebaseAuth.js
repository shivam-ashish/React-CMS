import React, { Component } from 'react';
import fire from '../../config/fire';
import Home from '../Home/Home';
// import Navbar from '../Navbar/Navbar';
import LoginForm from '../LoginForm/LoginForm';

class FirebaseAuth extends Component {
  // constructor(props) {
  //   super(props);
  //   console.log(this.props);
  //   this.state = {
  //     user: {},
  //   };
  // }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    const { changeLoginState, updateUser } = this.props;
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(changeLoginState);
        changeLoginState(true);
        updateUser(user);
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

export default FirebaseAuth;
