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

class App extends Component {
  state = {
    isLoggedIn: false,
  }

  changeLoginState = (bool) => {
    this.setState({ isLoggedIn: bool });
  }

  render() {
    const { isLoggedIn } = this.state;

    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Provider value={{
            state: this.state,
          }}
          >
            <Switch>
              <Route path="/auth" exact component={FirebaseAuth} />
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
