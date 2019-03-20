import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Fire from '../../config/fire';
import classes from './Home.module.css';
import Blogs from '../Blogs/Blogs';
import News from '../News/News';
import BlogsAndNewsPage from './BlogsAndNewsPage/BlogsAndNewsPage';

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout = () => {
    Fire.auth().signOut();
  }

  render() {
    const { path } = this.props.match;

    return (
      <div className={classes.box}>
        <Navbar />
        <Switch>
          <Route path={`${path}/blogs`} component={Blogs} />
          <Route path={`${path}/news`} component={News} />
          <Route
            path={`${path}`}
            component={BlogsAndNewsPage}
          />
        </Switch>
      </div>
    );
  }
}

export default Home;
