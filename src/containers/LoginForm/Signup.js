import React, { Component } from 'react';
import firebase from 'firebase';
import MDSpinner from 'react-md-spinner';
import classes from './LoginForm.module.css';
import Fire from '../../config/fire';
import withContext from '../Hoc/withContext';
import fire from '../../config/fire';

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
    const { name } = this.state;
    const { changeLoginState, updateUser, user } = this.props.val;
    this.setState({ spinner: true });
    e.preventDefault();
    Fire.auth().createUserWithEmailAndPassword(email, password)
      .then((u) => {
        // const { uid } = this.props.val.user;
        const database = firebase.database();
        const ref = database.ref('users');
        // fire.auth().onAuthStateChanged((user) => {
          // changeLoginState(true);
          // updateUser(user);
          // console.log(uid);
          const data = {
            userName: name,
            // uid: this.props.val.user.uid,
          };
          ref.push(data);
          // });
      })
      .catch((error) => {
        alert(error.message);
        this.setState({ spinner: false });
      });
      console.log(this.props);
      
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

export default withContext(Signup);
