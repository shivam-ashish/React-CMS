import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Fire from '../../config/fire';
// import classes from '../'

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
      <div>
        <li>
          Blogs
        </li>
        <li>
          News
        </li>
        {/* <button type="button" onClick={this.logoutHandler}>
          Logout
        </button> */}
        <Link to="/">
          <button
            type="button"
            onClick={this.logoutHandler}
            // className={classes.logOut}
          >
            Log Out
          </button>
        </Link>
      </div>
    );
  }
}

export default Navbar;
