/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import firebase from 'firebase';
import classes from './LoginForm.module.css';
import Fire from '../../config/fire';
import { Provider, Consumer } from '../DataStore/MyContext';
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
      name: '',
      display: false,
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
        const { name } = this.state;
        const database = firebase.database();
        const ref = database.ref('users');
        const data = {
          user_name: name,
        };
        ref.push(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  toggle = () => {
    const { display } = this.state;
    this.setState({
      display: !display,
    });
  }

  render() {
    const { email, password, name, display } = this.state;
    return (
      <div className={classes.box}>
      <Consumer>
        {(context) => (
            display ?
            <div className={classes.loginForm}>
            <h1>Sign UP Here</h1>
            <label htmlFor="email">Name : </label>
            <input value={name} onChange={this.handleChange} type="text" name="name"/>
            <label htmlFor="email">Email Address : </label>
            <input value={email} onChange={this.handleChange} type="email" name="email" />
            <label htmlFor="email">Password : </label>
            <input value={password} onChange={this.handleChange} type="password" name="password" />
            <button type="submit" className={classes.loginBtn} onClick={this.toggle}>Back to Login</button>
            <button type="submit" className={classes.loginBtn} onClick={()=> this.signup}>Sign Up</button>
            </div>
          :
            <div className={classes.loginForm}>
            <h1>Login Here</h1>
            <label htmlFor="email">Email Address : </label>
            <input value={email} onChange={this.handleChange} type="email" name="email" />
            <label htmlFor="email">Password : </label>
            <input value={password} onChange={this.handleChange} type="password" name="password" />
            <button type="submit" className={classes.loginBtn} onClick={this.login}>Login</button>
            <button type="submit" className={classes.loginBtn} onClick={this.toggle}>Sign Up</button>  
            </div>
        )}
      </Consumer>
      </div>  
    );
  }
}
    
export default LoginForm;
