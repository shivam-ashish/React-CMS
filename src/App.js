import React, { Component } from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import FirebaseAuth from './containers/FirebaseAuth/FirebaseAuth';
import Home from './containers/Home/Home';
import { Provider, Consumer } from './containers/DataStore/MyContext';

class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
  }

  changeLoginState = (bool) => {
    this.setState({
      isLoggedIn: bool,
    });
  }

  updateUser = (updatedUser) => {
    this.setState({ user: updatedUser });
  }

  render() {
    const { isLoggedIn } = this.state;
    const { changeLoginState, updateUser } = this;
    const store = {
      isLoggedIn,
      changeLoginState,
      updateUser,
    };

    return (
      <BrowserRouter>
        <Provider value={store}>
          <Consumer>
            {value => (
              <Switch>
                <Route
                  path="/auth"
                  exact
                  render={() => (
                    <FirebaseAuth
                      value={value}
                    />
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
            )}
          </Consumer>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
