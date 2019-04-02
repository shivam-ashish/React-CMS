import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '../../commonComponents/Button/Button';
import Fire from '../../config/fire';
import classes from './Navbar.module.scss';

class Navbar extends Component {
  logoutHandler = () => {
    Fire.auth().signOut();
  }

  render() {
    const { path } = this.props.match;
    const { displayName } = this.props.user
    return (
      <div className={classes.navbar}>
        <ul className={classes.navlist}>
          <Link to={`${path}`}>
            <li className={classes.displayName}>
              Hey
              {' '}
              { displayName }
            </li>
            <li>
              Home
            </li>
          </Link>
          <Link to={`${path}/blogs`}>
            <li>
              Blogs
            </li>
          </Link>
          <Link to={`${path}/news`}>
            <li>
              News
            </li>
          </Link>
        </ul>
        <Button type="LogOut" />

      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  userName: state.userName,
});

export default withRouter(connect(mapStateToProps)(Navbar));
