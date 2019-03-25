import React, { Component } from 'react';
import MDSpinner from 'react-md-spinner';
import withContext from '../Hoc/withContext';
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
      spinner: false,
    };
  }

  componentDidMount() {
    console.log('Component Did Mount Called in Login.js', this.props);
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
    return (
      <div>
        <div className={classes.loginForm}>
          <h1>Login Here</h1>
          <label htmlFor="email">Email Address : </label>
          <input value={email} onChange={this.handleChange} type="email" name="email" />
          <label htmlFor="email">Password : </label>
          <input value={password} onChange={this.handleChange} type="password" name="password" />
          <button
            type="submit"
            className={classes.loginBtn}
            onClick={(evt) => {
              this.login(evt);
            }}
          >
            {spinner ? <MDSpinner />:'Login'}

          </button>
          <button
            type="submit"
            className={classes.loginBtn}
            onClick={this.props.toggle}
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}

export default withContext(Login);
