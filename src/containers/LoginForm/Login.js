import React, { Component } from 'react';
import classes from './LoginForm.module.css';
import Fire from '../../config/fire';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: '',
    };
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

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <div className={classes.loginForm}>
          <h1>Login Here</h1>
          <label htmlFor="email">Email Address : </label>
          <input value={this.state.email} onChange={this.handleChange} type="email" name="email" />
          <label htmlFor="email">Password : </label>
          <input value={this.state.password} onChange={this.handleChange} type="password" name="password" />
          <button
            type="submit"
            className={classes.loginBtn}
            onClick={(evt) => {
              this.login(evt);
            }}
          >
            Login
          </button>
          <button type="submit" className={classes.loginBtn} onClick={this.toggle}>Sign Up</button>
        </div>
      </div>
    );
  }
}

export default Login;
