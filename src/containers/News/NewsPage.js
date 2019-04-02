import React, { Component } from 'react';
import {
  Link, withRouter, Switch, Route,
} from 'react-router-dom';
import MDSpinner from 'react-md-spinner';
import { connect } from 'react-redux';
import Fire from '../../config/fire';
import classes from './News.module.scss';
import AddEdit from './AddEdit/AddEdit';
import Button from '../../commonComponents/Button/Button';

class NewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      spinner: false,
    };
  }

  componentDidMount() {
    const { uid } = this.props.user;
    this.setState({ spinner: true });
    const database = Fire.database();
    const ref = database.ref('news');
    ref.orderByChild('submittedBy').equalTo(uid).on('value', this.gotData, this.errData);
  }

  gotData = (data) => {
    const { path } = this.props.match;
    if (data.val() == null) {
      this.setState({ spinner: false });
    } else {
      const news = data.val();
      const keys = Object.keys(news);
      this.setState({
        list: keys.map(key => (
          <li key={key}>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
              <Button
                type="X"
                delete={() => this.deleteData(key)}
              />
              <Link
                to={`${path}/editnews/${key}/edit`}
              >
                <Button
                  type="Edit"
                />
              </Link>
              {news[key].title}
            </div>
            {<br />}
            {news[key].body}
          </li>
        )),
      });
      this.setState({ spinner: false });
    }
  }

  errData = (err) => {
    console.log(err);
  }

  deleteData = (key) => {
    Fire.database().ref(`news/${key}`).remove();
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

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn,
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(NewsPage));
