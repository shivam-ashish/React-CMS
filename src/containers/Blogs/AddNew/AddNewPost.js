import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import classes from './AddNewPost.module.css';
import withContext from '../../Hoc/withContext';

class AddNewPost extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
       title: '',
       body: '',
       id: '',
    };
  }

  putData = () => {
    const { title, body } = this.state;
    const database = firebase.database();
    const ref = database.ref('blogs');
    const data = {
      title: title,
      body: body,
      id: this.props.val.user.uid,
    };
    ref.push(data);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    console.log(this.props);
      
    return (
      <div className={classes.post}>
        <h1>ADD YOUR POST</h1>
        <div className={classes.container}>
        <label htmlFor="title">Title</label>
        <br />
        <input value={this.state.title} onChange={this.handleChange} type="text" placeholder="Enter Title" name="title" />
        <br />
        <label htmlFor="body">Body</label>
        <br />
        <input value={this.state.body} onChange={this.handleChange} type="text" placeholder="Enter your Post" name="body" className={classes.body}/>
        <br />
        <Link to="/home/blogs"><button onClick={this.putData}>ADD POST</button></Link>
        </div>
      </div>
    );
  }
}

export default withContext(AddNewPost);
