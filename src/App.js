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
    console.log(this.props);
    // const stateProps = this.props.store.getState();
    console.log(store);
    
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
  return {
    // isLoggedIn: state.isLoggedIn,
    // user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLoginState: (bool) => dispatch({type: 'LOGIN_STATE', isLoggedIn: bool}),
    updateUser: () => dispatch({ type: 'UPDATE_USER' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
