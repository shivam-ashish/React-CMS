import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '../../commonComponents/Button/Button';
import Fire from '../../config/fire';
import classes from './Navbar.module.scss';
import BtnClass from '../../commonComponents/Button/Button.module.scss';

class Navbar extends Component {
  logoutHandler = () => {
    Fire.auth().signOut();
  }

  render() {
    const { match: { path } } = this.props;
    const { user: { displayName } } = this.props;
    return (
      <div className={classes.navbar}>
        <ul className={classes.navlist}>
          <Link to={`${path}`}>
            <li className={classes.displayName}>
              { displayName }
            </li>
            <li className={classes.list}>
              Home
            </li>
          </Link>
          <Link to={`${path}/blogs`}>
            <li className={classes.list}>
              Blogs
            </li>
          </Link>
          <Link to={`${path}/news`}>
            <li className={classes.list}>
              News
            </li>
          </Link>
        </ul>
        <Link to="/">
          <Button
            type="LogOut"
            className={BtnClass.logOut}
            click={this.logoutHandler}
          >
            {'LogOut'}
          </Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.reducer.user,
  userName: state.reducer.userName,
});

export default withRouter(connect(mapStateToProps)(Navbar));
