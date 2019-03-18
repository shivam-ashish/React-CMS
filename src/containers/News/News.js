import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import classes from './News.module.css';
import Fire from '../../config/fire';
// eslint-disable-next-line react/prefer-stateless-function
class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map2: [],
    };
  }

  componentDidMount() {
    const database = firebase.database();
    const ref = database.ref('news');
    ref.on('value', this.gotData, this.errData);
    console.log('DID MOUNT');
  }

  gotData = (data) => {
    console.log(data.val());
    const news = data.val();
    const keys = Object.keys(news);
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
          {news[key].title}
        </div>
        {<br />}
        {news[key].body}
      </li>
    ));
    this.setState({ map2: map1 });
  }

  errData = (err) => {
    console.log(err);
  }

  logout = () => {
    Fire.auth().signOut();
  }

  render() {
    const { map2 } = this.state;
    return (
      <div className={classes.box}>
        <Link to="/AddNewNews"><button className={classes.add}>Add News</button></Link>
        <Link to="/"><button onClick={this.logout} className={classes.logOut}>Log Out</button></Link>
        <h1>News</h1>
        <ul>
          {map2}
        </ul>
      </div>
    );
  }
}

export default News;
