import React, { Component } from 'react';
import firebase from 'firebase';
import MDSpinner from 'react-md-spinner';
import BtnClass from '../../commonComponents/Button/Button.module.scss';
import classes from './LoginForm.module.scss';
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
        <h1 className={classes.heading}>SignUp Page</h1>
        <label className={classes.labelField} htmlFor="email">Name : </label>
        <input id="name" className={classes.inputField} value={name} onChange={this.handleChange} type="text" name="name" />
        <label className={classes.labelField} htmlFor="email">Email Address : </label>
        <input id="email" className={classes.inputField} value={email} onChange={this.handleChange} type="email" name="email" />
        <label className={classes.labelField} htmlFor="email">Password : </label>
        <input id="password" className={classes.inputField} value={password} onChange={this.handleChange} type="password" name="password" />
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
          {spinner ? <MDSpinner /> : <div>&#10004;</div>}
        </Button>
      </div>
    );
  }
}

export default Signup;
