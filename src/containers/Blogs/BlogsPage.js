import React, { Component } from 'react';
import { Link, withRouter, Route, Switch } from 'react-router-dom';
import firebase from 'firebase';
import classes from './Blogs.module.css';
import EditPost from './EditPost/EditPost';

class BlogsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map2: [],
    };
  }

  componentDidMount() {
    const database = firebase.database();
    const ref = database.ref('blogs');
    ref.on('value', this.gotData, this.errData);
  }

  gotData = (data) => {
    const blogs = data.val();
    const keys = Object.keys(blogs);
    const map1 = keys.map(key => (
      <li key={key}>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
          <button className={classes.delete} onClick={() => this.deleteData(key)}>X</button>
          <Link
            to={{pathname:`${this.props.match.path}/EditPost`, state:{key}}}>
            <button
              className={classes.update}
            >
              Edit
            </button>
          </Link>
          {blogs[key].title}
        </div>
        {<br />}
        {blogs[key].body}
      </li>
    ));
    this.setState({ map2: map1 });
  }

  errData = (err) => {
    console.log(err);
  }

  deleteData = (key) => {
    firebase.database().ref(`blogs/${key}`).remove();
  }

  editData = (key) => {

  }

  render() {
    const { map2 } = this.state;
    const { path } = this.props.match;
    return (
      <Switch>
        <Route path={`${path}/EditPost`} component={EditPost} />
        <Route path={`${path}`} >
          <>
            <Link to={`${path}/AddNewPost`}>
              <button
                className={classes.add}
                type="button"
              >
                Add Post
              </button>
            </Link>
            <h1>BLOGS</h1>
            <ul>
              {map2}
            </ul>
          </>
        </Route>
      </Switch>
    );
  }
}

export default withRouter(BlogsPage);
