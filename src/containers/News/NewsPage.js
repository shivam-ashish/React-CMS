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
      map2: [],
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
        const map1 = keys.map(key => (
          <li key={key}>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
            <button className={classes.delete} onClick={()=>this.deleteData(key)}>X</button>
            <Link
            to={{pathname:`${this.props.match.path}/EditNews`, state:{key}}}>
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
        ));
        this.setState({ map2: map1 });
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
        const { map2 } = this.state;
        const { path } = this.props.match;
        return (
          <Switch>
            <Route path={`${path}/AddNewNews`} component={AddNewNews} />
            <Route path={`${path}/EditNews`} component={EditNews} />
            <Route
              path={`${path}`}
              render={() => (
                <>
                  <Link to={`${path}/AddNewNews`}>
                    <button className={classes.add}>Add News</button>

                  </Link>
                  <h1>News</h1>
                  <ul>
                    {map2}
                  </ul>
                </>
              )}
            />
          </Switch>
        );
      }
}

export default withRouter(NewsPage);
