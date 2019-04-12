import React, { Component } from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import { connect } from 'react-redux';
import FirebaseAuth from './containers/FirebaseAuth/FirebaseAuth';
import Home from './containers/Home/Home';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <BrowserRouter>
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
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.reducer.isLoggedIn,
  user: state.reducer.user,
});

export default connect(mapStateToProps)(App);
