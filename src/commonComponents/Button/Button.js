import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Fire from '../../config/fire';
import classes from './Button.module.css';

const logout = () => {
  Fire.auth().signOut();
};

const Button = (props) => {
  const { type } = props;
  let button;
  if( type === 'LogOut' ){
    button = <Link to="/"><button onClick={logout} className={classes.logOut}>{ type }</button></Link>
  }
  if( type === 'Add Post'){
    button = <button className={classes.addPost}>{ type }</button>
  }
  if( type === 'Add News'){
    button = <button className={classes.addNews}>{ type }</button>
  }
  return (
    <div>
      {button}
    </div>
  );
};

export default Button;
