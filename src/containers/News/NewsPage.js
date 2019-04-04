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
import BtnClass from '../../commonComponents/Button/Button.module.scss';

class NewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      spinner: false,
      title: '',
      body: '',
      edit: false,
    };
  }

  componentDidMount() {
    const { uid } = this.props.user;
    this.setState({ spinner: true });
    const database = Fire.database();
    const ref = database.ref('news');
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
    const { path } = this.props.match;
    if (data.val() == null) {
      this.setState({ spinner: false });
    } else {
      const news = data.val();
      const keys = Object.keys(news);
      this.setState({
        list: keys.map(key => (
          <div className={classes.subContainers} key={key}>
            <div className={classes.upperSection}>
              <Button
                type="X"
                click={() => this.deleteData(key)}
                className={BtnClass.delete}
              >
                {'X'}
              </Button>
              <Link
                to={`${path}/editnews/${key}/edit`}
              >
                <Button
                  type="Edit"
                  className={BtnClass.edit}
                  click={() => this.editHandler(news[key].title, news[key].body)}
                >
                  {'Edit'}
                </Button>
              </Link>
              <h1>{news[key].title}</h1>
            </div>
            {<br />}
            {news[key].body}
          </div>
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
        <Route
          path={`${path}/editnews/:key/:type`}
          render={() => <AddEdit editObject={this.state} />
          }
        />
        <Route
          path={`${path}`}
          render={() => (
            <>
              <Link to={`${path}/addnewnews/add`}>
                <Button
                  type="Add News"
                  className={BtnClass.add}
                >
                  {'+'}
                </Button>
              </Link>
              <h1>News</h1>
              {spinner ? (<div className={classes.spinner}><MDSpinner /></div>)
                : (
                  <div className={classes.container}>
                    {list}
                  </div>
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
  isLoggedIn: state.reducer.isLoggedIn,
  user: state.reducer.user,
});

export default withRouter(connect(mapStateToProps)(NewsPage));
