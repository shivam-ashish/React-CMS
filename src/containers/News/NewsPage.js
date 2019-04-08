import React, { Component } from 'react';
import {
  Link, withRouter, Switch, Route,
} from 'react-router-dom';
import MDSpinner from 'react-md-spinner';
import { connect } from 'react-redux';
import Fire from '../../config/fire';
import classes from './News.module.scss';
import AddEdit from './AddEdit/AddEdit';
import NewsItem from './DisplayNews';
import Button from '../../commonComponents/Button/Button';
import BtnClass from '../../commonComponents/Button/Button.module.scss';

class NewsPage extends Component {
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
    const ref = database.ref('news');
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
    if (data.val() == null) {
      this.setState({
        spinner: false,
        msg: true,
      });
    } else {
      const news = data.val();
      this.props.updateNews(news);
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
    Fire.database().ref(`news/${key}`).remove();
  }

  showData = () => {
    const { news } = this.props;
    const { match: { path } } = this.props;
    let keys = [];
    let values = [];

    if (news) {
      keys = Object.keys(news);
      values = Object.values(news);
    }
    return (
      <div>
        {
          keys.map((key, index) => (
            <div className={classes.subContainers} key={key}>
              <NewsItem
                id={key}
                val={values[index]}
                editHandler={this.editHandler}
                deleteData={this.deleteData}
                path={path}
              />
            </div>
          ))
        }
      </div>
    );
  }

  gotVal = () => {
    const { msg } = this.state;
    if (msg) {
      return (
        <div><h1 className={classes.heading}>Nothing to Display</h1></div>
      );
    }
    else {
      return (
        <div className={classes.container}>
          {this.showData()}
        </div>
      )
    }
  }

  render() {
    const { spinner } = this.state;
    const { match: { path } } = this.props;
    return (
      <Switch>
        <Route path={`${path}/addnewnews/:type`} component={AddEdit} />
        <Route
          path={`${path}/editnews/:key/:type`}
          render={() => <AddEdit editObject={this.state} />
          }
        />
        <Route path={`${path}`}>
          <>
            <Link to={`${path}/addnewnews/add`}>
              <Button
                type="Add News"
                className={BtnClass.add}
              >
                {'+'}
              </Button>
            </Link>
            <h1 className={classes.heading}>News</h1>
            {
              spinner
                ? <div className={classes.spinner}><MDSpinner /></div>
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
  news: state.newsReducer.news,
});

const mapDispatchToProps = dispatch => ({
  updateNews: news => dispatch({ type: 'updateNews', payload: news }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewsPage));
