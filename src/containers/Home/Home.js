import React, { Component } from 'react';
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
        <button type="button" onClick={this.logout} className={classes.logOut}>Log Out</button>
        <br />
        <button type="button" className={classes.blogs}>BLOGS</button>
        <button type="button" className={classes.news}>NEWS</button>
      </div>
    );
  }
}

export default Home;
