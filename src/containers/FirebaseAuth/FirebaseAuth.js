import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import fire from '../../config/fire';
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

export default withRouter(FirebaseAuth);
