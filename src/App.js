import React, { Component } from 'react';
import {
  BrowserRouter, Redirect, Switch, Route, Router,
} from 'react-router-dom';
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
  }

  changeLoginState = (bool) => {
    this.setState({ isLoggedIn: bool });
    console.log('called from firebase auth');
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
        <Provider value={store}>
          <Navbar />
          <Switch>
            <Route path="/" component={Blogs} />
          </Switch>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
