import React, { Component } from 'react';
import firebase from 'firebase';
import MDSpinner from 'react-md-spinner';
import BtnClass from '../../commonComponents/Button/Button.module.css';
import classes from './LoginForm.module.css';
import Fire from '../../config/fire';
import Button from '../../commonComponents/Button/Button';

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
    const { email, password, name } = this.state;
    this.setState({ spinner: true });
    e.preventDefault();
    Fire.auth().createUserWithEmailAndPassword(email, password)
      .then((u) => {
        const database = firebase.database();
        const ref = database.ref('users');
        const data = {
          userName: name,
          uid: u.user.uid,
        };
        u.user.updateProfile({ displayName: data.userName });
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
    const {
      email, password, name, spinner,
    } = this.state;

    const { toggle } = this.props;

    return (
      <div className={classes.loginForm}>
        <h1>SignUp Page</h1>
        <label htmlFor="email">Name : </label>
        <input value={name} onChange={this.handleChange} type="text" name="name" />
        <label htmlFor="email">Email Address : </label>
        <input value={email} onChange={this.handleChange} type="email" name="email" />
        <label htmlFor="email">Password : </label>
        <input value={password} onChange={this.handleChange} type="password" name="password" />
        <Button
          type="Back to Login"
          click={toggle}
          className={BtnClass.login}
        >
            Back to Login
        </Button>
        <Button
          type="SignUp"
          click={e => this.signup(e)}
          className={BtnClass.signup}
        >
          {spinner ? <MDSpinner /> : 'Sign Up'}
        </Button>
      </div>
    );
  }
}

export default Signup;
