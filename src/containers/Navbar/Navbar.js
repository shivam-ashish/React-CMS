import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
    return (
      <div className={classes.navbar}>
        <ul>
          <NavLink to="/blogs">
            <li>
          Blogs
            </li>
          </NavLink>
          <NavLink to="/news" active="color: green">
            <li>
          News
            </li>
          </NavLink>
        </ul>
        <Btn type="logout" />
      </div>
    );
  }
}

export default Navbar;
