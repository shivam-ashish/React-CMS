import React, { Component } from 'react';
import {
  Link, withRouter, Route, Switch,
} from 'react-router-dom';
import firebase from 'firebase';
import MDSpinner from 'react-md-spinner';
import classes from './Blogs.module.css';
import EditPost from './EditPost/EditPost';
import AddNewPost from './AddNew/AddNewPost';
import Button from '../../commonComponents/Button/Button';
import withContext from '../Hoc/withContext';

class BlogsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      spinner: false,
    };
  }

  componentDidMount() {
    this.setState({ spinner: true });
    const database = firebase.database();
    const ref = database.ref('blogs');
    ref.on('value', this.gotData, this.errData);
  }

  gotData = (data) => {
    const blogs = data.val();
    const keys = Object.keys(blogs);
    this.setState({
      list: keys.map(key => (
        (blogs[key].submittedBy === this.props.val.user.uid)?(
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
        </li>):(null)
      )),
    });
    this.setState({ spinner: false });
  }

  errData = (err) => {
    console.log(err);
  }

  deleteData = (key) => {
    firebase.database().ref(`blogs/${key}`).remove();
  }

  render() {   
    const { list, spinner } = this.state;
    const { path } = this.props.match;
    return (
      <Switch>
        <Route path={`${path}/addnewpost`} component={()=><AddNewPost type="ADD"/>} />
        <Route path={`${path}/editpost/:key`} component={EditPost} />
        <Route path={`${path}`}>
          <>
            <Link to={`${path}/addnewpost`}>
              <Button type="Add Post" />
            </Link>
            <h1>BLOGS</h1>
            {spinner ? (<div className={classes.spinner}><MDSpinner /></div>)
              : (
                <ul>
                  {list}
                </ul>
              )
            }
          </>
        </Route>
      </Switch>
    );
  }
}

export default withContext(withRouter(BlogsPage));
