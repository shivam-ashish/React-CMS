import React, { Component } from 'react';
import Btn from '../../commonComponents/Btn/Btn';
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
        <Btn type="logout" />
      </div>
    );
  }
}

export default Navbar;
