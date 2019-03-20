import React, { Component } from 'react';
import { BrowserRouter, Redirect, Switch, withRouter } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import FirebaseAuth from './containers/FirebaseAuth/FirebaseAuth';
import Blogs from './containers/Blogs/Blogs';
import News from './containers/News/News';
import Home from './containers/Home/Home';
import AddNewPost from './containers/Blogs/AddNew/AddNewPost';
import AddNewNews from './containers/News/AddNew/AddNewNews';
// import MyProvider from './containers/DataStore/MyContext';
import { Provider } from './containers/DataStore/MyContext';
import Navbar from './containers/Navbar/Navbar';
import Login from './containers/LoginForm/Login';

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
    console.log('called from firebase auth');
    if (this.state.isLoggedIn === true) {
      this.state.pr.history.push('/home');
    }
  }

  updateUser = (user) => {
    this.setState({ user });
  }

  render() {
    const { isLoggedIn, user } = this.state;
    const { changeLoginState, updateUser } = this;

    console.log('user', user);

    const store = {
      isLoggedIn,
      user,
      changeLoginState,
      updateUser
    }

    return (
      <BrowserRouter>
        <div>
          <Provider value={{
            state: this.state,
          }}
          >
            <Switch>
              <Route
                path="/auth"
                exact
                render={props => (
                  <FirebaseAuth
                    {...props}
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
                // render={props => (
                //   <Home {...props} />
                // )}
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

withRouter(Home);
export default App;
