import React, { Component } from 'react';
import firebase from 'firebase';
import classes from './LoginForm.module.css';
import Fire from '../../config/fire';
import MDSpinner from 'react-md-spinner';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: '',
      password: '',
      name: '',
      spinner: '',
    };
  }

  signup = (e) => {
    const { email, password } = this.state;
    this.setState({ spinner: true });
    e.preventDefault();
    Fire.auth().createUserWithEmailAndPassword(email, password)
      .then((u) => {
        const { name } = this.state;
        const database = firebase.database();
        const ref = database.ref('users');
        const data = {
          userName: name,
        };
        ref.push(data);
      })
      .catch((error) => {
        alert(error.message);
        this.setState({ spinner: false });
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { email, password, name, spinner } = this.state;
    return (
      <div className={classes.loginForm}>
        <h1>Sign UP Here</h1>
        <label htmlFor="email">Name : </label>
        <input value={name} onChange={this.handleChange} type="text" name="name" />
        <label htmlFor="email">Email Address : </label>
        <input value={email} onChange={this.handleChange} type="email" name="email" />
        <label htmlFor="email">Password : </label>
        <input value={password} onChange={this.handleChange} type="password" name="password" />
        <button type="submit" className={classes.loginBtn} onClick={this.props.toggle}>Back to Login</button>
        <button type="submit" className={classes.loginBtn} onClick={(e) => this.signup(e)}>{spinner?<MDSpinner/>:'Sign Up'}</button>
      </div>
    );
  }
}

export default Signup;
