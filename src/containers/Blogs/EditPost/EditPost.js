import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import classes from './EditPost.module.css';

class EditPost extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
           title: '',
           body: '',
        };
      }

      editData = () => {
        const { key } = this.props.match.params;
        console.log(key);
        firebase.database().ref(`blogs/${key}`).update({
            title: this.state.title,
            body: this.state.body,
        })
      }

      handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }
  render() {
    return (
      <div className={classes.post}>
        <h1>EDIT YOUR POST</h1>
        <div className={classes.container}>
        <label htmlFor="title">Title</label>
        <br />
        <input value={this.state.title} onChange={this.handleChange} type="text" placeholder="Enter Title" name="title" />
        <br />
        <label htmlFor="body">Body</label>
        <br />
        <input value={this.state.body} onChange={this.handleChange} type="text" placeholder="Enter your Post" name="body" className={classes.body}/>
        <br />
        <Link to="/home/blogs"><button onClick={this.editData}>EDIT POST</button></Link>
        </div>
      </div>
    )
  }
}

export default EditPost;