import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import FirebaseAuth from './containers/FirebaseAuth/FirebaseAuth';
import Blogs from './containers/Blogs/Blogs';
import News from './containers/News/News';
import { Provider } from './containers/DataStore/MyContext';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      display: false,
    };
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Provider value={{
            state: this.state,
          }}
          >
            <Route path="/" exact component={FirebaseAuth} />
            <Route path="/blogs" exact component={Blogs} />
            <Route path="/news" exact component={News} />
          </Provider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
