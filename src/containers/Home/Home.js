import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Fire from '../../config/fire';
import classes from './Home.module.css';

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
        <Navbar />
        <br />
        <Link to="/blogs"><button type="button" className={classes.blogs}>BLOGS</button></Link>
        <Link to="/news"><button type="button" className={classes.news}>NEWS</button></Link>
      </div>
    );
  }
}

export default Home;
