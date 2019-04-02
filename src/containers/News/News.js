import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import classes from './News.module.scss';
import NewsPage from './NewsPage';

// eslint-disable-next-line react/prefer-stateless-function
class News extends Component {
  render() {
    const { path } = this.props.match;
    return (
      <div className={classes.box}>
        <Route
          path={`${path}`}
          render={() => (
            <NewsPage />
          )}
        />
      </div>
    );
  }
}

export default News;
