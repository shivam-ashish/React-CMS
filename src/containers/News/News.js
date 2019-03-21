import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import classes from './News.module.css';
import AddNewNews from './AddNew/AddNewNews';
import NewsPage from './NewsPage';
// eslint-disable-next-line react/prefer-stateless-function
class News extends Component {
  render() {
    const { path } = this.props.match;
    return (
      <div className={classes.box}>
        <Switch>
          <Route path={`${path}/AddNewNews`} component={AddNewNews} />
          <Route
            path={`${path}`}
            render={() => (
              <NewsPage />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default News;
