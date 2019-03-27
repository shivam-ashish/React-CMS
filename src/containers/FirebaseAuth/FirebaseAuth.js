import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import fire from '../../config/fire';
import LoginForm from '../LoginForm/LoginForm';
import withContext from '../Hoc/withContext';
import { connect } from 'react-redux';

class FirebaseAuth extends Component {
  componentDidMount() {
    this.authListener();
  }

  authListener() {
    // const { history } = this.props;
    // const { changeLoginState, updateUser } = this.props.val;
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        const { uid } = user;
        // changeLoginState(true);
        // updateUser(user, uid);
        console.log("inside IF");
        this.props.changeLoginState(true);
        this.props.updateUser(user);
        // history.push('/home');
      } else {
        // changeLoginState(false);
        // updateUser(null);
        console.log("Inside else");
        
        this.props.changeLoginState(false);
        this.props.updateUser(null);
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

const mapStateToProps = (state) => {
  console.log('mapStateToProps',state);
  return {
    isLoggedIn: state.isLoggedIn,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLoginState: (bool) => dispatch({type: 'LOGIN_STATE', isLoggedIn: bool}),
    updateUser: (updatedUser) => dispatch({ type: 'UPDATE_USER', user: updatedUser }),
  };
};


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(FirebaseAuth));
