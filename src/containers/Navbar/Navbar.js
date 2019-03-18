import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Fire from '../../config/fire';
import classes from './Navbar.module.css';
import LogOut from '../../commonComponents/LogOut/LogOut';

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
    return (
      <div className={classes.navbar}>
      <ul>
        <li>
          Blogs
        </li>
        <li>
          News
        </li>
      </ul>
        <LogOut />
      </div>
    );
  }
}

export default Navbar;
