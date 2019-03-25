import React, { Component } from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import FirebaseAuth from './containers/FirebaseAuth/FirebaseAuth';
import Home from './containers/Home/Home';
import { Provider } from './containers/DataStore/MyContext';

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
    console.log('updated User in App.js', this.state.user, this.state.userId);
  }

  render() {
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

export default App;
