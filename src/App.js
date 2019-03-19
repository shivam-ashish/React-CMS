import React, { Component } from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import FirebaseAuth from './containers/FirebaseAuth/FirebaseAuth';
import Blogs from './containers/Blogs/Blogs';
import News from './containers/News/News';
import Home from './containers/Home/Home';
import AddNewPost from './containers/Blogs/AddNew/AddNewPost';
import AddNewNews from './containers/News/AddNew/AddNewNews';
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

    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Provider value={{
            state: this.state,
          }}
          >
            <Switch>
              <Route
                path="/auth"
                exact
                render={() => (
                  <FirebaseAuth
                    changeLoginState={changeLoginState}
                    updateUser={updateUser}
                  />
                )}
              />
              {isLoggedIn && <Route path="/home" component={Home} />}
              {/* <Route path="/blogs" component={Blogs} />
              <Route path="/AddNewPost" component={AddNewPost} />
              <Route path="/AddNewNews" component={AddNewNews} />
              <Route path="/news" component={News} /> */}
              <Redirect from="/" to="/auth" />
            </Switch>
          </Provider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
