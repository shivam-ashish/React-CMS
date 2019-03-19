import React, { Component } from 'react';
import fire from '../../config/fire';
import Home from '../Home/Home';
import axios from 'axios';
// import Navbar from '../Navbar/Navbar';
import LoginForm from '../LoginForm/LoginForm';

class FirebaseAuth extends Component {
  componentDidMount() {
    this.authListener();
    // const key = 'AIzaSyCSjK0ElDeKM4HhzBDmN1rW75GOeh_zM4I';
    // const signUpUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${key}`;

    // axios.post(signUpUrl, {
    //   email: 'vs12@gmail.com',
    //   password: 'fhgfhdhdh',
    //   returnSecureToken: true,
    // })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // console.log('Heyy');
  }

  authListener() {
    const { changeLoginState , updateUser } = this.props;
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(changeLoginState);
        changeLoginState(true);
        updateUser(user);
      }
      else{
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

export default FirebaseAuth;
