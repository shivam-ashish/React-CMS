import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import fire from '../../config/fire';
import LoginForm from '../LoginForm/LoginForm';

class FirebaseAuth extends Component {
  componentDidMount() {
    this.authListener();
  }

  authListener() {
    const { history } = this.props;
    const { changeLoginState, updateUser } = this.props;
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

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => ({
  changeLoginState: bool => dispatch({ type: 'LOGIN_STATE', isLoggedIn: bool }),
  updateUser: updatedUser => dispatch({ type: 'UPDATE_USER', user: updatedUser }),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)((FirebaseAuth)));
