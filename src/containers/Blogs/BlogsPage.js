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
    };
  }

  componentDidMount() {
    console.log('inside compoDidMount props ->', this.props, 'state ->', this.state);
    const { user: { uid } } = this.props;
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
      this.setState({ spinner: true });
    } else {
      const blogs = data.val();
      this.props.updateBlogs(blogs);
      this.setState({
        spinner: false,
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

    console.log(keys, values);

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

  render() {
    console.log('inside render props ->', this.props, 'state ->', this.state);
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
            <h1 className={classes.heading}>BLOGS</h1>
            {spinner ? (<div className={classes.spinner}><MDSpinner /></div>)
              : (
                <div className={classes.container}>
                  {this.showData()}
                </div>
              )
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
