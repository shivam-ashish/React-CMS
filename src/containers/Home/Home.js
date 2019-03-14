import React, { Component } from 'react';
import fire from '../../config/fire';
import classes from'./Home.module.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }


logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <div className={classes.box}>
        <button onClick={this.logout} className={classes.logOut}>Log Out</button><br />        <button className={classes.blogs}>BLOGS</button>
        <button className={classes.news}>NEWS</button>
      </div>
    )
  }
}

export default Home;
