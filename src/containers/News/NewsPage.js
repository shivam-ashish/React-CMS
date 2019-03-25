import React, { Component } from 'react';
import firebase from 'firebase';
import {
  Link, withRouter, Switch, Route,
} from 'react-router-dom';
import MDSpinner from 'react-md-spinner';
import Fire from '../../config/fire';
import classes from './News.module.css';
import AddNewNews from './AddNew/AddNewNews';
import EditNews from './EditNews/EditNews';
import Button from '../../commonComponents/Button/Button';
import withContext from '../Hoc/withContext';

class NewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      id: null,
      spinner: false,
    };
  }

  componentDidMount() {
    const { uid } = this.props.val.user;
    this.setState({ spinner: true, id: uid });
    const database = firebase.database();
    const ref = database.ref('news');
    ref.on('value', this.gotData, this.errData);
  }

  gotData = (data) => {
    const news = data.val();
    const keys = Object.keys(news);
    this.setState({
      list: keys.map(key => (
        (news[key].submittedBy === this.props.val.user.uid) ? (
          <li key={key}>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
              <button
                className={classes.delete}
                onClick={() => this.deleteData(key)}
              >
                X
                </button>
              <Link
                to={`${this.props.match.path}/editnews/${key}`}
              >
                <button
                  className={classes.update}
                >
                  Edit
                </button>
              </Link>
              {news[key].title}
            </div>
            {<br />}
            {news[key].body}
          </li>) : (true)
      )),
    });
    this.setState({ spinner: false });
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
        <Route path={`${path}/addnewnews`} component={AddNewNews} />
        <Route path={`${path}/editnews/:key`} component={EditNews} />
        <Route
          path={`${path}`}
          render={() => (
            <>
              <Link to={`${path}/addnewnews`}>
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

export default withContext(withRouter(NewsPage));
