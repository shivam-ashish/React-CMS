import React, { Component } from 'react';
<<<<<<< HEAD
import { Link, Redirect } from 'react-router-dom';
=======
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
>>>>>>> c3c44f92610f71b180f0e22479d597aefdff7acd
import Fire from '../../config/fire';
import classes from './Home.module.css';
import LogOut from '../../commonComponents/LogOut/LogOut';

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }


  logout = () => {
    Fire.auth().signOut();
  }

  render() {
    return (
      <div className={classes.box}>
<<<<<<< HEAD
        <LogOut type='logout'/>
=======
        <Navbar />
>>>>>>> c3c44f92610f71b180f0e22479d597aefdff7acd
        <br />
        <Link to="/blogs"><button type="button" className={classes.blogs}>BLOGS</button></Link>
        <Link to="/news"><button type="button" className={classes.news}>NEWS</button></Link>
      </div>
    );
  }
}

export default Home;
