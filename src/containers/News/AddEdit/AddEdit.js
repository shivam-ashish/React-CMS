import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Fire from '../../../config/fire';
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
    const { uid } = this.props.user;
    const database = Fire.database();
    const ref = database.ref('news');
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
    const { key } = this.props.match.params;
    const { uid } = this.props.user;
    const { title, body, timeStamp } = this.state;
    Fire.database().ref(`news/${key}`).update({
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
          type="Add Your News"
          className={BtnClass.addYourPost}
          click={this.putData}
        >
          {'Add Your News'}
        </Button>
      );
      case 'edit': return (
        <Button
          type="Edit Your News"
          className={BtnClass.editYourPost}
          click={this.editData}
        >
          {'Edit Your News'}
        </Button>
      );
      default: return null;
    }
  }

  render() {
    const { type } = this.props.match.params;
    const { title, body } = this.state;
    return (
      <div className={classes.post}>
        <h1>
          { type.toUpperCase() }
          {' '}
        YOUR NEWS
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
          <Link to="/home/news">
            { this.addOrEdit(type) }
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
