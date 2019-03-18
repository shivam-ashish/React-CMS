import React from 'react';
import { Link } from 'react-router-dom';
import Fire from '../../config/fire';
import classes from './Btn.module.css';

const logout = () => {
  Fire.auth().signOut();
};

const btn = (props) => {
  const { type } = props.type;
  return (
    <div>
      <Link to="/">
        <button
          type="button"
          onClick={logout}
          className={classes.logOut}
        >
          Log Out
          { type }
        </button>
      </Link>
    </div>
  );
};

export default btn;
