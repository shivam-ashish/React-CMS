import React, { Component } from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import FirebaseAuth from './containers/FirebaseAuth/FirebaseAuth';
import Home from './containers/Home/Home';
import { Provider, Consumer } from './containers/DataStore/MyContext';
import wrapper from './containers/hoc/aux';

class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    pr: null,
  }

  changeLoginState = (bool, props) => {
    this.setState({
      isLoggedIn: bool,
      pr: props,
    });
    const { isLoggedIn, pr } = this.state;
    if (isLoggedIn === true) {
      pr.history.push('/home');
    }
  }

  updateUser = (updatedUser) => {
    this.setState({ user : updatedUser});
  }

  render() {
    const { isLoggedIn, user } = this.state;
    const { changeLoginState, updateUser } = this;
    const store = {
      isLoggedIn,
      user,
      changeLoginState,
      updateUser,
    };

    return (
      <BrowserRouter>
        <div>
          <Provider value={store}
          >
            <Consumer>
              {(value) => {
                return(
                  <Switch>
                    <Route
                      path="/auth"
                      exact
                      render={() => (
                        <FirebaseAuth
                          value={value}
                          // changeLoginState={changeLoginState}
                          // updateUser={updateUser}
                          // isLoggedIn={this.state.isLoggedIn}
                        />
                      )}
                    />
                    {isLoggedIn && (
                    <Route
                      path="/home"
                      component={Home}
                      // render={props => (
                      //   <Home {...props} />
                      // )}
                    />
                    )}
                    <Redirect from="/" to="/auth" />
              </Switch>
                );
              }}
            </Consumer>
          <Provider value={store}>
            <Switch>
              <Route
                path="/auth"
                exact
                render={() => (
                  <FirebaseAuth
                    changeLoginState={changeLoginState}
                    updateUser={updateUser}
                    // isLoggedIn={this.state.isLoggedIn}
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
          </Provider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
