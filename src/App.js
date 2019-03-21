import React, { Component } from 'react';
import { BrowserRouter, Redirect, Switch, withRouter } from 'react-router-dom';
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
    // console.log('called from firebase auth');
    if (this.state.isLoggedIn === true) {
      this.state.pr.history.push('/home');
    }
  }

  updateUser = (updatedUser) => {
    this.setState({ user : updatedUser});
  }

  render() {
    const { isLoggedIn, user } = this.state;
    const { changeLoginState, updateUser } = this;

    // console.log('user', user);

    const store = {
      isLoggedIn,
      user,
      changeLoginState,
      updateUser
    }

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
          </Provider>
        </div>
      </BrowserRouter>
    );
  }
}

withRouter(Home);
export default wrapper(App);
