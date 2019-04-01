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
  if (type === 'Login') {
    button = <button type="submit" onClick={props.login} className={classes.login}>{props.children}</button>;
  }
  if (type === 'New SignUp') {
    button = <button type="submit" onClick={props.toggle} className={classes.signup}>{type}</button>;
  }
  if (type === 'Back to Login') {
    button = <button type="submit" onClick={props.toggle} className={classes.login}>{type}</button>;
  }
  if (type === 'SignUp') {
    button = <button type="submit" onClick={props.signup} className={classes.signup}>{props.children}</button>;
  }
  if (type === 'LogOut') {
    button = <Link to="/"><button type="button" onClick={logout} className={classes.logOut}>{type}</button></Link>;
  }
  if (type === 'BLOGS') {
    button = <button type="button" className={classes.blogs}>{type}</button>;
  }
  if (type === 'NEWS') {
    button = <button type="button" className={classes.news}>{type}</button>;
  }
  if (type === 'Add Post') {
    button = <button type="button" className={classes.addPost}>{type}</button>;
  }
  if (type === 'Add News') {
    button = <button type="button" className={classes.addNews}>{type}</button>;
  }
  if (type === 'Edit') {
    button = <button type="button" className={classes.edit}>{type}</button>;
  }
  if (type === 'X') {
    button = <button type="button" className={classes.delete} onClick={props.delete}>{type}</button>;
  }
  if (type === 'Edit Your Post') {
    button = <button type="button" className={classes.editYourPost} onClick={props.edit}>{type}</button>;
  }
  if (type === 'Add Your Post') {
    button = <button type="button" className={classes.addYourPost} onClick={props.add}>{type}</button>;
  }
  if (type === 'Edit Your News') {
    button = <button type="button" className={classes.editYourPost} onClick={props.edit}>{type}</button>;
  }
  if (type === 'Add Your News') {
    button = <button type="button" className={classes.addYourPost} onClick={props.add}>{type}</button>;
  }
  return (
    <>
      {button}
    </>
  );
};

export default Button;
