/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import classes from './LoginForm.module.css';
import { Provider, Consumer } from '../DataStore/MyContext';
import Login from './Login';
import Signup from './Signup';

class LoginForm extends Component {
  constructor(props) {
    super(props);
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
  toggle = () => {
    const { display } = this.state;
    this.setState({
      display: !display,
    });
  }

  render() {
    const {
      email, password, name, display,
    } = this.state;
    return (
      <div className={classes.box}>
      <Consumer>
        {(context) => (
          display ?
          <Signup />
          :
          <Login/>
        )}
      </Consumer>
      </div>  
    );
  }
}
    
export default LoginForm;
