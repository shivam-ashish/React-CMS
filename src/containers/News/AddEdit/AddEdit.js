import React, { Component } from 'react';
import Fire from '../../../config/fire';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './AddEdit.module.css';

class AddNewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
    };
  }

  componentDidMount() {
    this.setState({
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
    ref.push(data);
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

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { type } = this.props.match.params;
    const { title, body } = this.state;
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

const mapStateToProps = state => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(AddNewPost));
