import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Fire from '../../config/fire';
import classes from './Home.module.css';
import Blogs from '../Blogs/Blogs';
import AddNewPost from '../Blogs/AddNew/AddNewPost';
import News from '../News/News';
import AddNewNews from '../News/AddNew/AddNewNews';
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
        <Navbar />
        <Switch>
          <Route path={`${path}/blogs`} component={Blogs} />
          <Route path={`${path}/news`} component={News} />
          <Route
            path="/"
            render={() => (
              <>
                <Link to={`${path}/blogs`}><button type="button" className={classes.blogs}>BLOGS</button></Link>

                <Link to={`${path}/news`}><button type="button" className={classes.news}>NEWS</button></Link>
              </>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default Home;
