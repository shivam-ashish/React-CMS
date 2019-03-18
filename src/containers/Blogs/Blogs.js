import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import Navbar from '../Navbar/Navbar';
import classes from './Blogs.module.css';
// eslint-disable-next-line react/prefer-stateless-function
class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map2: [],
    };
  }

  componentDidMount() {
    const database = firebase.database();
    const ref = database.ref('blogs');
    ref.on('value', this.gotData, this.errData);
    console.log('DID MOUNT');
  }

  gotData = (data) => {
    console.log(data.val());
    const blogs = data.val();
    const keys = Object.keys(blogs);
    console.log('keys=', keys);
    // for (var i=0; i<keys.length; i++){
    //   var k = keys[i];
    //   var title = blogs[k].title;
    //   var body = blogs[k].body;
    //   console.log(title,body);

    // }

    const map1 = keys.map(key => (
      <li key={key}>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
          {blogs[key].title}
        </div>
        {<br />}
        {blogs[key].body}
      </li>
    ));
    this.setState({ map2: map1 });
  }

  errData = (err) => {
    console.log(err);
  }

  // logout = () => {
  //   Fire.auth().signOut();
  // }

  render() {
    const { map2 } = this.state;
    return (
      <div className={classes.box}>
        <Link to="/AddNewPost">
          <button
            className={classes.add}
            type="button"
          >
            Add Post
          </button>
        </Link>
        <h1>BLOGS</h1>
        <ul>
          {map2}
        </ul>
      </div>
    );
  }
}

export default Blogs;
