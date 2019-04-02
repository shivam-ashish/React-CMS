import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '../../commonComponents/Button/Button';
import Fire from '../../config/fire';
import classes from './Navbar.module.css';
import BtnClass from '../../commonComponents/Button/Button.module.css';

class Navbar extends Component {
  logoutHandler = () => {
    Fire.auth().signOut();
  }

  render() {
    const { path } = this.props.match;
    const { displayName } = this.props.user;
    return (
      <div className={classes.navbar}>
        <ul>
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
  user: state.user,
  userName: state.userName,
});

export default withRouter(connect(mapStateToProps)(Navbar));
