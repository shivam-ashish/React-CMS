import React, { Component } from 'react';
import {
  Link, withRouter, Route, Switch,
} from 'react-router-dom';
import MDSpinner from 'react-md-spinner';
import { connect } from 'react-redux';
import Fire from '../../config/fire';
import classes from './Blogs.module.css';
import Button from '../../commonComponents/Button/Button';
import AddEdit from './AddEdit/AddEdit';

class BlogsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      title: '',
      body: '',
      edit: false,
      spinner: false,
    };
  }

  componentDidMount() {
    const { uid } = this.props.user;
    this.setState({
      spinner: true,
    });
    const database = Fire.database();
    const ref = database.ref('blogs');
    ref.orderByChild('submittedBy').equalTo(uid).on('value', this.gotData, this.errData);
  }

  editHandler = (titleVal, bodyVal) => {
    this.setState({
      title: titleVal,
      body: bodyVal,
      edit: true,
    });
  }

  gotData = (data) => {
    if (data.val() == null) {
      this.setState({ spinner: false });
    } else {
      const blogs = data.val();
      const keys = Object.keys(blogs);
      this.setState({
        list: keys.map(key => (
          <li key={key}>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
              <button
                type="button"
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
                  onClick={() => this.editHandler(blogs[key].title, blogs[key].body)}
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
      this.setState({ spinner: false });
    }
  }

  errData = (err) => {
    alert(err);
  }

  deleteData = (key) => {
    Fire.database().ref(`blogs/${key}`).remove();
  }

  render() {
    const { list, spinner } = this.state;
    const { path } = this.props.match;

    return (
      <Switch>
        <Route path={`${path}/addnewpost/:type`} component={AddEdit} />
        <Route
          path={`${path}/editpost/:key/:type`}
          render={() => <AddEdit editObject={this.state} />
          }
        />
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
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default withRouter(connect(mapStateToProps)(BlogsPage));
