import React, { Component } from 'react';
import firebase from 'firebase';
import {
  Link, withRouter, Switch, Route,
} from 'react-router-dom';
import MDSpinner from 'react-md-spinner';
import Fire from '../../config/fire';
import classes from './News.module.css';
import AddEdit from './AddEdit/AddEdit';
import Button from '../../commonComponents/Button/Button';
import withContext from '../Hoc/withContext';
import { connect } from 'react-redux';

class NewsPage extends Component {
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
    const ref = database.ref('news');
    ref.orderByChild('submittedBy').equalTo(this.props.user.uid).on('value', this.gotData, this.errData);
  }

  gotData = (data) => {
    if(data.val()==null){
      this.setState({spinner: false})
    }
    else{
    const news = data.val();
    const keys = Object.keys(news);
    this.setState({
      list: keys.map(key => (
        // (news[key].submittedBy === this.props.val.user.uid) ? (
          <li key={key}>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
              <button
                className={classes.delete}
                onClick={() => this.deleteData(key)}
              >
                X
                </button>
              <Link
                to={`${this.props.match.path}/editnews/${key}/edit`}
              >
                <button
                  className={classes.edit}
                >
                  Edit
                </button>
              </Link>
              {news[key].title}
            </div>
            {<br />}
            {news[key].body}
          </li>
          // ) : (null)
      )),
    });
    this.setState({ spinner: false });
  }
  }
  errData = (err) => {
    console.log(err);
  }

  deleteData = (key) => {
    firebase.database().ref(`news/${key}`).remove();
  }

  logout = () => {
    Fire.auth().signOut();
  }

  render() {
    const { list, spinner } = this.state;
    const { path } = this.props.match;
    return (
      <Switch>
        <Route path={`${path}/addnewnews/:type`} component={AddEdit} />
        <Route path={`${path}/editnews/:key/:type`} component={AddEdit} />
        <Route
          path={`${path}`}
          render={() => (
            <>
              <Link to={`${path}/addnewnews/add`}>
                <Button type="Add News" />
              </Link>
              <h1>News</h1>
              {spinner ? (<div className={classes.spinner}><MDSpinner /></div>)
                : (
                  <ul>
                    {list}
                  </ul>
                )
              }
            </>
          )}
        />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps', state);
  return {
    isLoggedIn: state.isLoggedIn,
    user: state.user,
  };
};

export default withRouter(connect(mapStateToProps)(NewsPage));
