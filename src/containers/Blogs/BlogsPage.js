import React, { Component } from 'react';
import {
  Link, withRouter, Route, Switch,
} from 'react-router-dom';
import MDSpinner from 'react-md-spinner';
import { connect } from 'react-redux';
import Fire from '../../config/fire';
import classes from './Blogs.module.scss';
import Button from '../../commonComponents/Button/Button';
import AddEdit from './AddEdit/AddEdit';
import BlogItem from './DisplayBlogs';
import BtnClass from '../../commonComponents/Button/Button.module.scss';

class BlogsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      edit: false,
      spinner: false,
      msg: false,
    };
  }

  componentDidMount() {
    const { user: { uid } } = this.props;
    this.setState({
      spinner: true,
    });
    const database = Fire.database();
    const ref = database.ref('blogs');
    ref.orderByChild('submittedBy')
      .equalTo(uid)
      .on('value', this.gotData, this.errData);
  }

  editHandler = (titleVal, bodyVal) => {
    this.setState({
      title: titleVal,
      body: bodyVal,
      edit: true,
    });
  }

  gotData = (data) => {
    const { props } = this;
    if (data.val() == null) {
      this.setState({
        spinner: false,
        msg: true,
      });
    } else {
      const blogs = data.val();
      props.updateBlogs(blogs);
      this.setState({
        spinner: false,
        msg: false,
      });
    }
  }

  errData = (err) => {
    console.log(err);
  }

  deleteData = (key) => {
    Fire.database().ref(`blogs/${key}`).remove();
  }

  showData = () => {
    const { blogs } = this.props;
    const { match: { path } } = this.props;
    let keys = [];

    let values = [];

    if (blogs) {
      keys = Object.keys(blogs);
      values = Object.values(blogs);
    }

    return (
      <div>
        {
          keys.map((key, index) => (
            <li className={classes.subContainers} key={key}>
              <BlogItem
                path={path}
                id={key}
                val={values[index]}
                deleteData={this.deleteData}
                editHandler={this.editHandler}
              />
            </li>
          ))
        }
      </div>
    );
  }

  gotVal = () => {
    const { msg } = this.state;
    if (msg) {
      return (
        <div><h1>Nothing to Display</h1></div>
      );
    }
    else {
      return (
        (<div className={classes.container}>
          {this.showData()}
          </div>)
      );
    }
  }

  render() {
    const { spinner } = this.state;
    const { match: { path } } = this.props;

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
              <Button
                type="Add Post"
                className={BtnClass.add}
              >
                {'+'}
              </Button>
            </Link>
            <h1>BLOGS</h1>
            {
              spinner
                ? (<div className={classes.spinner}><MDSpinner /></div>)
                : this.gotVal()
            }
          </>
        </Route>
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  user: state.reducer.user,
  blogs: state.blogReducer.blogs,
});

const mapDispatchToProps = dispatch => ({
  updateBlogs: blogs => dispatch({ type: 'updateBlogs', payload: blogs }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlogsPage));
