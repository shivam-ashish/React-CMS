/* eslint-disable no-alert */
import React, { Component } from 'react';
import firebase from 'firebase';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './AddEdit.module.css';

class AddNewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      timeStamp: '',
    };
  }

  componentDidMount() {
    this.setState({
      timeStamp: `${new Date().getTime()}`,
    });
  }

  putData = () => {
    const { title, body, timeStamp } = this.state;
    const { props } = this;
    const { uid } = props.user;
    const database = firebase.database();
    const ref = database.ref('blogs');
    const data = {
      title,
      body,
      submittedBy: uid,
      submittedOn: timeStamp,
      updatedBy: uid,
      updatedOn: timeStamp,
    };
    if (uid === data.submittedBy) {
      ref.push(data);
    } else {
      alert('Cant Access!!!');
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  editData = () => {
    const { props } = this;
    const { key } = props.match.params;
    const { uid } = props.user;
    const { title, body, timeStamp } = this.state;
    const database = firebase.database();
    const ref = database.ref(`blogs/${key}`);
    if (ref.orderByChild('submittedBy').equalTo(uid)) {
      firebase.database().ref(`blogs/${key}`).update({
        title,
        body,
        updatedBy: uid,
        updatedOn: timeStamp,
      });
    } else {
      alert('Cant Access!!!');
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { props } = this;
    const { type } = props.match.params;
    const { title, body } = this.state;
    return (
      <div className={classes.post}>
        <h1>
          {type}
          YOUR POST
        </h1>
        <div className={classes.container}>
          <label htmlFor="title">Title</label>
          <br />
          <input
            value={title}
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
            value={body}
            onChange={this.handleChange}
            type="text"
            placeholder="Enter your Post"
            name="body"
            className={classes.body}
          />
          <br />
          <Link to="/home/blogs">
            {(() => {
              switch (type) {
                case 'add': return (
                  <button
                    type="button"
                    onClick={this.putData}
                  >
                    {type}
                    POST
                  </button>
                );
                case 'edit': return (
                  <button
                    type="button"
                    onClick={this.editData}
                  >
                    {type}
                    POST
                  </button>
                );
                default: return null;
              }
            })()}
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(AddNewPost));
