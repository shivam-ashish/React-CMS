import React, { Component } from 'react';
import classes from './Blogs.module.css';
import firebase from 'firebase';
import Fire from '../../config/fire';
// eslint-disable-next-line react/prefer-stateless-function
class Blogs extends Component {
  componentDidMount() {
    const database = firebase.database();
    const ref = database.ref('blogs');
    ref.on('value', this.gotData, this.errData);
  }

  gotData = (data) => {
    console.log(data.val());
    
  }

  errData = (err) => {
    console.log(err);
    
  }

  render() {
    return (
      <div className={classes.box}>
        <h1>Blogs</h1>
      </div>
    );
  }
}

export default Blogs;
