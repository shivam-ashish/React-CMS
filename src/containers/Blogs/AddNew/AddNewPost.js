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
      submittedBy: '',
      submittedOn: '',
      updatedBy: '',
      updatedOn: '',
      innerText: '',
    };
  }

  putData = () => {
    const { title, body } = this.state;
    const database = firebase.database();
    const ref = database.ref('blogs');
    const data = {
      title,
      body,
      submittedBy: this.props.val.user.uid,
      updatedBy: this.props.val.user.uid,
      updatedOn: this.props.val.user.metadata,
    };
    ref.push(data);
    this.setState({
      innerText: 'Add',
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  editData = () => {
    console.log('called editadata');
    const { key } = this.props.match.params;
    console.log(key);
    firebase.database().ref(`blogs/${key}`).update({
      title: this.state.title,
      body: this.state.body,
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className={classes.post}>
        <h1>{this.state.innerText} YOUR POST</h1>
        <div className={classes.container}>
          <label htmlFor="title">Title</label>
          <br />
          <input
            value={this.state.title}
            onChange={this.handleChange}
            type="text"
            placeholder="Enter Title"
            name="title"
          />
          <br />
          <label htmlFor="body">
            Body
          </label>
          <br />
          <input
            value={this.state.body}
            onChange={this.handleChange}
            type="text"
            placeholder="Enter your Post"
            name="body"
            className={classes.body}
          />
          <br />
          <Link to="/home/blogs">
            <button
              type="button"
              purpose="add"
              onClick={this.putData}
            >
              ADD POST
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withContext(AddNewPost);
