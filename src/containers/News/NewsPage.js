import React, { Component } from 'react';
import firebase from 'firebase';
import {
  Link, withRouter, Switch, Route,
} from 'react-router-dom';
import Fire from '../../config/fire';
import classes from './News.module.css';
import AddNewNews from './AddNew/AddNewNews';
import EditNews from './EditNews/EditNews';

class NewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    const database = firebase.database();
    const ref = database.ref('news');
    ref.on('value', this.gotData, this.errData);
  }

      gotData = (data) => {
        const news = data.val();
        const keys = Object.keys(news);
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
            </li>
          )),
        });
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
        const { list } = this.state;
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
                    <button className={classes.add}>Add News</button>

                  </Link>
                  <h1>News</h1>
                  <ul>
                    {list}
                  </ul>
                </>
              )}
            />
          </Switch>
        );
      }
}

export default withRouter(NewsPage);
