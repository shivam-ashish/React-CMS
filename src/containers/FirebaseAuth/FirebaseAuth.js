import React, { Component } from 'react';
import fire from '../../config/fire';
// import { Link } from 'react-router-dom';
// import { Consumer} from '../DataStore/MyContext';
// import Home from '../Home/Home';
// import axios from 'axios';
// import Navbar from '../Navbar/Navbar';
import LoginForm from '../LoginForm/LoginForm';

class FirebaseAuth extends Component {
  // constructor(props){
  //   super(props);
  // }
  componentDidMount() {
    this.authListener();
  }

  authListener() {
    console.log('value of props in firebase sent by consumer',this.props.value);
    const { changeLoginState, updateUser } = this.props.value;
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log(changeLoginState);
        changeLoginState(true, this.props);
        updateUser(user);
      } else {
        changeLoginState(false);
        updateUser(null);
      }
    });
  }

  render() {
    // console.log("URL matching",this.props);
    // console.log(this.props.value);
    return (
      <div>
        <LoginForm />
        {/* <Consumer>
          {(value) => {
            // console.log(value);
            // const {user, changeLoginState, isLoggedIn, updateUser } = value;
            return(
              <LoginForm />
            );
          }}
        </Consumer> */}
      </div>
    );
  }
}

export default FirebaseAuth;
