import React, { Component } from 'react';
import firebase from 'firebase';
import { Link, withRouter } from 'react-router-dom';
import classes from './AddEdit.module.css';
import withContext from '../../Hoc/withContext';
import { connect } from 'react-redux';

class AddNewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      timeStamp: '',
      submittedBy: '',
      submittedOn: '',
      updatedBy: '',
      updatedOn: '',
    };
  }

  componentDidMount() {
    // const setTime = `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`;
    this.setState({ 
      timeStamp: `${new Date().getTime()}`,
    });
  }

  putData = () => {
    const { title, body, timeStamp } = this.state;
    const { uid } = this.props.user;
    const database = firebase.database();
    const ref = database.ref('news');
    const data = {
      title,
      body,
      submittedBy: uid,
      submittedOn: timeStamp,
      updatedBy: uid,
      updatedOn: timeStamp,
    };
    if(uid === data.submittedBy ){
    ref.push(data);
    }
    else{
      alert('Cant Access');
    }
  }

  editData = () => {
    const { key } = this.props.match.params;
    const { uid } = this.props.user;
    const { title, body, timeStamp } = this.state;
    firebase.database().ref(`news/${key}`).update({
      title: title,
      body: body,
      updatedBy: uid,
      updatedOn: timeStamp,
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { type } = this.props.match.params;
    return (
      <div className={classes.post}>
        <h1>
          { type }
        YOUR NEWS
        </h1>
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
          <Link to="/home/news">


            {(() => {
              switch (type) {
                case 'add': return (
                  <button
                    type="button"
                    onClick={this.putData}
                  >
                    { type }
                     NEWS
                  </button>
                );
                case 'edit': return (
                  <button
                    type="button"
                    onClick={this.editData}
                  >
                    { type }
                     NEWS
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

const mapStateToProps = (state) => {
  console.log('mapStateToProps',state);
  return {
    user: state.user,
  };
};

export default withRouter(connect(mapStateToProps)(AddNewPost));

