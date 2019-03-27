import React, { Component } from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import FirebaseAuth from './containers/FirebaseAuth/FirebaseAuth';
import Home from './containers/Home/Home';
import { Provider } from './containers/DataStore/MyContext';
import { connect } from 'react-redux';

class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    userId: null,
  }

  changeLoginState = (bool) => {
    this.setState({
      isLoggedIn: bool,
    });
  }

  updateUser = (updatedUser, uid) => {
    this.setState({
      user: updatedUser,
      userId: uid,
    });
  }

  render() {
    console.log('Render', this.props);
    // this.props.changeLoginState(true);
    // this.props.updateUser('Ashish');
    // console.log(this.props.user);
    
    const { isLoggedIn, user, userId } = this.state;
    const { changeLoginState, updateUser } = this;
    const store = {
      user,
      isLoggedIn,
      userId,
      changeLoginState,
      updateUser,
    };

    return (
      <BrowserRouter>
        <Provider value={store}>
          <Switch>
            <Route
              path="/auth"
              exact
              render={() => (
                <FirebaseAuth />
              )}
            />
            {isLoggedIn && (
            <Route
              path="/home"
              component={Home}
            />
            )}
            <Redirect from="/" to="/auth" />
          </Switch>
        </Provider>
      </BrowserRouter>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
