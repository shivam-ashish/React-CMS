import React, { Component } from 'react';
import MDSpinner from 'react-md-spinner';
import classes from './LoginForm.module.scss';
import BtnClass from '../../commonComponents/Button/Button.module.scss';
import Fire from '../../config/fire';
import Button from '../../commonComponents/Button/Button';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: '',
      spinner: false,
    };
  }

  login = (e) => {
    const { email, password } = this.state;
    this.setState({ spinner: true });
    e.preventDefault();
    Fire.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
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
    const { email, password, spinner } = this.state;
    const { toggle } = this.props;
    return (
      <div className={classes.loginForm}>
        <h1 className={classes.heading}>Login Here</h1>
        <label className={classes.labelField} htmlFor="email">Email Address : </label>
        <input className={classes.inputField} value={email} onChange={this.handleChange} type="email" name="email" />
        <label className={classes.labelField} htmlFor="email">Password : </label>
        <input className={classes.inputField} value={password} onChange={this.handleChange} type="password" name="password" />
        <Button
          type="Login"
          className={BtnClass.login}
          click={(evt) => {
            this.login(evt);
          }}
        >
          {spinner ? <MDSpinner /> : 'Login'}
        </Button>
        <Button
          type="New SignUp"
          className={BtnClass.signup}
          click={toggle}
        >
          {'+'}
        </Button>
      </div>
    );
  }
}

export default Login;
