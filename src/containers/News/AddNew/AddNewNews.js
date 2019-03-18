import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import classes from './AddNewNews.module.css';

class AddNewPost extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
       title: '',
       body: '',
    };
  }

  putData=() => {
    const { title, body } = this.state;
    const database = firebase.database();
    const ref = database.ref('news');
    const data = {
      title: title,
      body: body,
    };
    ref.push(data);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className={classes.post}>
        <h1>ADD YOUR News</h1>
        <div className={classes.container}>
        <label htmlFor="title">Title</label>
        <br />
        <input value={this.state.title} onChange={this.handleChange} type="text" placeholder="Enter Title" name="title" />
        <br />
        <label htmlFor="body">Body</label>
        <br />
        <input value={this.state.body} onChange={this.handleChange} type="text" placeholder="Enter your Post" name="body" className={classes.body}/>
        <br />
        <Link to="/news"><button onClick={this.putData}>ADD News</button></Link>
        </div>
      </div>
    );
  }
}

export default AddNewPost;
