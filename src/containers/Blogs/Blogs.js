import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import classes from './Blogs.module.scss';
import BlogsPage from './BlogsPage';

// eslint-disable-next-line react/prefer-stateless-function
class Blogs extends Component {
  render() {
    const { match: { path } } = this.props;
    return (
      <div className={classes.box}>
        <Switch>
          <Route
            path={`${path}`}
            render={() => (
              <BlogsPage />
            )}
          />
        </Switch>

      </div>
    );
  }
}

export default Blogs;
