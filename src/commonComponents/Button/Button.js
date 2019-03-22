import React from 'react';
import { Link } from 'react-router-dom';
import Fire from '../../config/fire';
import classes from './Button.module.css';

const logout = () => {
  Fire.auth().signOut();
};

const Button = (props) => {
  const { type } = props;
  let button;
  if( type === 'LogOut' ){
    button = <button onClick={logout} className={classes.logOut}>{ type }</button>
  }
  if( type === 'Add'){
    
  }
  console.log(type);
  return (
    <div>
      <Link to="/">
        {button}
      </Link>
    </div>
  );
};

export default Button;
