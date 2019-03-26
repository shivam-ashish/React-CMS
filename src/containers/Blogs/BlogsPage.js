import React, { Component } from 'react';
import {
  Link, withRouter, Route, Switch,
} from 'react-router-dom';
import firebase from 'firebase';
import MDSpinner from 'react-md-spinner';
import classes from './Blogs.module.css';
import Button from '../../commonComponents/Button/Button';
import withContext from '../Hoc/withContext';
import AddEdit from './AddEdit/AddEdit';

class BlogsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      spinner: false,
    };
  }

  componentDidMount() {
    const { uid } = this.props.val.user;
    this.setState({ spinner: true, id: uid });
    const database = firebase.database();
    const ref = database.ref('blogs');
    ref.orderByChild('submittedBy').equalTo(this.props.val.user.uid).on('value', this.gotData, this.errData);
  }

  gotData = (data) => {
    const blogs = data.val();
    const keys = Object.keys(blogs);
    this.setState({
      list: keys.map(key => (
        // (blogs[key].submittedBy === this.props.val.user.uid)?(
        <li key={key}>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
            <button
              className={classes.delete}
              onClick={() => this.deleteData(key)}
            >
            X
            </button>
            <Link
              to={`${this.props.match.path}/editpost/${key}/edit`}
            >
              <button
                type="button"
                className={classes.edit}
              >
                Edit
              </button></Link>
              <Link
                to={`${this.props.match.path}/editpost/${key}`}
              >
                {/* <button
                  type="button"
                  className={classes.delete}
                  onClick={() => this.deleteData(key)}
                >
                  X
                </button> */}
              </Link>
              {blogs[key].title}
            </div>
            {<br />}
            {blogs[key].body}
          </li>
          // ) : (null)
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
        <Route path={`${path}/addnewpost/:type`} component={AddEdit} />
        <Route path={`${path}/editpost/:key/:type`} component={AddEdit} />
        <Route path={`${path}`}>
          <>
            <Link to={`${path}/addnewpost/add`}>
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
