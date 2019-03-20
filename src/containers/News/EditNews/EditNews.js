import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import classes from './EditNews.module.css';

class EditNews extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
           title: '',
           body: '',
        };
      }

      editData = () => {
        const { key } = this.props.location.state;
        console.log(key);
        firebase.database().ref(`news/${key}`).update({
            title: this.state.title,
            body: this.state.body,
        })
      }

      handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }

  render() {
    return (
        <div className={classes.news}>
        <h1>EDIT YOUR NEWS</h1>
        <div className={classes.container}>
        <label htmlFor="title">Title</label>
        <br />
        <input value={this.state.title} onChange={this.handleChange} type="text" placeholder="Enter Title" name="title" />
        <br />
        <label htmlFor="body">Body</label>
        <br />
        <input value={this.state.body} onChange={this.handleChange} type="text" placeholder="Enter your News" name="body" className={classes.body}/>
        <br />
        <Link to="/blogs"><button onClick={this.editData}>EDIT NEWS</button></Link>
        </div>
      </div>
    )
  }
}

export default EditNews;
