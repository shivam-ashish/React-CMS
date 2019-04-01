/* eslint-disable no-alert */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import Edit from './Edit';
import firebase from '../../../config/fire';
import classes from './AddEdit.module.css';
import Button from '../../../commonComponents/Button/Button';

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
    ref.push(data);
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

  render() {
    const { props } = this;
    const { type } = props.match.params;
    const { title, body } = this.state;

    return (
      <div className={classes.post}>
        <h1>
          {type.toUpperCase()}
          {' '}
          YOUR POST
        </h1>
        <div className={classes.container}>
          <label htmlFor="title">Title</label>
          <br />
          <input
            onChange={this.handleChange}
            type="text"
            value={title}
            name="title"
          />
          <br />
          <label htmlFor="body">
            Body
          </label>
          <br />
          <input
            onChange={this.handleChange}
            type="text"
            value={body}
            name="body"
            className={classes.body}
          />
          <br />
          <Link to="/home/blogs">
            {(() => {
              switch (type) {
                case 'add': return (
                  <Button
                    type="Add Your Post"
                    add={this.putData}
                  />
                );
                case 'edit': return (
                  <Button
                    type="Edit Your Post"
                    edit={this.editData}
                  />
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
