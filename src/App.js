import React, { Component } from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import FirebaseAuth from './containers/FirebaseAuth/FirebaseAuth';
import Blogs from './containers/Blogs/Blogs';
import News from './containers/News/News';
import Home from './containers/Home/Home';
import AddNewPost from './containers/Blogs/AddNew/AddNewPost';
import AddNewNews from './containers/News/AddNew/AddNewNews';
import { Provider } from './containers/DataStore/MyContext';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Provider value={{
            state: this.state,
          }}
          >
            <Route path="/" exact render={() => (<Redirect to="/auth" />)} />
            <Route path="/auth" exact component={FirebaseAuth} />
            <Route path="/home" exact component={Home} />
            <Route path="/blogs" exact component={Blogs} />
            <Route path="/AddNewPost" exact component={AddNewPost} />
            <Route path="/AddNewNews" exact component={AddNewNews} />
            <Route path="/news" exact component={News} />
          </Provider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
