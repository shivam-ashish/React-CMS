import React from 'react';
import { Link } from 'react-router-dom';
import Fire from '../../config/fire';
import classes from './LogOut.module.css';

const logout = () => {
  Fire.auth().signOut();
};

const LogOut = (props) => (
  <div>
    <Link to="/">
      <button
        type="button"
        onClick={logout}
        className={classes.logOut}
      >
        Log Out
        {props.type}
      </button>
    </Link>
  </div>
);

export default LogOut;
