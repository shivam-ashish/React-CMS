/* eslint-disable no-alert */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import Edit from './Edit';
import firebase from '../../../config/fire';
import classes from './AddEdit.module.scss';
import Button from '../../../commonComponents/Button/Button';
import BtnClass from '../../../commonComponents/Button/Button.module.scss';

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
    console.log('inside addEdit compoDidMount', this.props);
    const { editObject } = this.props;

    let updateState = {};

    if (editObject) {
      updateState = { ...editObject };
    }

    this.setState({
      ...updateState,
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
    if (title && body != null) {
      ref.push(data);
    } else {
      alert('Plzzz Enter Some Value!!!');
    }
  }

  editData = () => {
    const { props } = this;
    const { key } = props.match.params;
    const { uid } = props.user;
    const { title, body, timeStamp } = this.state;
    firebase.database().ref(`blogs/${key}`).update({
      title,
      body,
      updatedBy: uid,
      updatedOn: timeStamp,
    });
  }


  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  }

  addOrEdit = (type) => {
    switch (type) {
      case 'add': return (
        <Button
          type="Add Your Post"
          className={BtnClass.addEdit}
          click={this.putData}
        >
          {'Add Your Post'}
        </Button>
      );
      case 'edit': return (
        <Button
          type="Edit Your Post"
          className={BtnClass.addEdit}
          click={this.editData}
        >
          {'Edit Your Post'}
        </Button>
      );
      default: return null;
    }
  }

  render() {
    const { props } = this;
    const { type } = props.match.params;
    const { title, body } = this.state;

    return (
      <div className={classes.post}>
        <h1 className={classes.heading}>
          {type.toUpperCase()}
          {' '}
          YOUR POST
        </h1>
        <div className={classes.container}>
          <label className={classes.labelField} htmlFor="title">Title</label>
          <br />
          <input
            className={classes.inputField}
            onChange={this.handleChange}
            type="text"
            value={title}
            name="title"
          />
          <br />
          <label className={classes.labelField} htmlFor="body">
            Body
          </label>
          <br />
          <input
            className={classes.inputField}
            onChange={this.handleChange}
            type="text"
            value={body}
            name="body"
          />
          <br />
          <Link to="/home/blogs">
            {this.addOrEdit(type)}
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.reducer.user,
});

export default withRouter(connect(mapStateToProps)(AddNewPost));
