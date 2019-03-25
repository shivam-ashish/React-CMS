import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Btn from '../../commonComponents/Btn/Btn';
import Fire from '../../config/fire';
import classes from './Navbar.module.css';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      dumy: true,
    };
  }

  logoutHandler = () => {
    console.log('clicked');
    Fire.auth().signOut();
  }

  render() {
    const { path } = this.props.match;
    return (
      <div className={classes.navbar}>
        <ul>
          <Link to={`${path}`}>
            <li>
              Home
            </li>
          </Link>
          <Link to={`${path}/blogs`}>
            <li>
              Blogs
            </li>
          </Link>
          <Link to={`${path}/news`}>
            <li>
              News
            </li>
          </Link>
        </ul>
        <Btn type="logout" />

      </div>
    );
  }
}

export default withRouter(Navbar);
