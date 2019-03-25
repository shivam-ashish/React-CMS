import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '../../commonComponents/Button/Button';
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
        <Button type="LogOut" />

      </div>
    );
  }
}

export default withRouter(Navbar);
