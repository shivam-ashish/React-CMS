/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import classes from './LoginForm.module.css';
import Fire from '../../config/fire';
// import user from '../../assets/user.png';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  login = (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    Fire.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
      })
      .catch((error) => {
        console.log(error);
      });
  }

  signup = (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    Fire.auth().createUserWithEmailAndPassword(email, password)
      .then((u) => {
        console.log(u);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className={classes.box}>
        <div className={classes.loginForm}>
          <h1>Login Here</h1>
          <label htmlFor="email">Email Address : </label>
          <input value={email} onChange={this.handleChange} type="email" name="email" />
          <label htmlFor="email">Password : </label>
          <input value={password} onChange={this.handleChange} type="password" name="password" />
          <button type="submit" className={classes.loginBtn} onClick={this.login}>Login</button>
        </div>
      </div>
    );
  }
}

export default LoginForm;
