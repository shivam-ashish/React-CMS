import React, { Component } from 'react';
// import { Link, withRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Fire from '../../config/fire';
import classes from './Home.module.css';
import Blogs from '../Blogs/Blogs';
// import AddNewPost from '../Blogs/AddNew/AddNewPost';
import News from '../News/News';
// import AddNewNews from '../News/AddNew/AddNewNews';
import BlogsAndNewsPage from './BlogsAndNewsPage/BlogsAndNewsPage';
// import Btn from '../../commonComponents/LogOut/Btn';

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
        {console.log('Home compo', path)}
        <Navbar {...this.props} />
        <Switch>
          <Route path={`${path}/blogs`} component={Blogs} />
          <Route path={`${path}/news`} component={News} />
          <Route
            path="/"
            render={() => (
              <BlogsAndNewsPage {...this.props} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default Home;
