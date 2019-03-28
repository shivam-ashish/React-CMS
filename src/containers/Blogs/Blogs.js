import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import classes from './Blogs.module.css';
import AddNewPost from './AddEdit/AddEdit';
import BlogsPage from './BlogsPage';
// eslint-disable-next-line react/prefer-stateless-function
class Blogs extends Component {
  render() {
    const { path } = this.props.match;
    console.log('Blogs');
    return (
      <div className={classes.box}>
        <Switch>
          <Route path={`${path}/AddNewPost/:type`} component={AddNewPost} />
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
