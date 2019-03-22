import React, { Component } from 'react';
import {
  Link, withRouter, Route, Switch,
} from 'react-router-dom';
import firebase from 'firebase';
import classes from './Blogs.module.css';
import EditPost from './EditPost/EditPost';
import AddNewPost from './AddNew/AddNewPost';

class BlogsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
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
    this.setState({
      list: keys.map(key => (
        <li key={key}>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
            <button
              className={classes.delete}
              onClick={() => this.deleteData(key)}
            >
            X
            </button>
            <Link
              to={`${this.props.match.path}/editpost/${key}`}
            >
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
      )),
    });
    // this.setState({ map2: map1 });
  }

  errData = (err) => {
    console.log(err);
  }

  deleteData = (key) => {
    firebase.database().ref(`blogs/${key}`).remove();
  }

  render() {
    const { list } = this.state;
    const { path } = this.props.match;
    return (
      <Switch>
        <Route path={`${path}/addnewpost`} component={AddNewPost} />
        <Route path={`${path}/editpost/:key`} component={EditPost} />
        <Route path={`${path}`}>
          <>
            <Link to={`${path}/addnewpost`}>
              <button
                className={classes.add}
                type="button"
              >
                Add Post
              </button>
            </Link>
            <h1>BLOGS</h1>
            <ul>
              {list}
            </ul>
          </>
        </Route>
      </Switch>
    );
  }
}

export default withRouter(BlogsPage);
