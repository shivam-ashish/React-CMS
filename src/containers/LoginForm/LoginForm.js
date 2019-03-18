/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import classes from './LoginForm.module.css';
import { Consumer } from '../DataStore/MyContext';
import Login from './Login';
import Signup from './Signup';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      display: false,
    };
  }

  toggle = () => {
    const { display } = this.state;
    this.setState({
      display: !display,
    });
  }

  render() {
    const { display } = this.state;
    // const {
    //   email, password, name, display,
    // } = this.state;
    return (
      <div className={classes.box}>
        <Consumer>
          {/* {value => (
            console.log(value)
          )
          } */}
          {value => (
            display
              ? <Signup val={value} toggle={this.toggle} />
              : <Login val={value} toggle={this.toggle} />
          )
          }
        </Consumer>
      </div>
    );
  }
}

export default LoginForm;
