import React, { Component } from 'react';
import firebase from 'firebase';
import classes from './LoginForm.module.css';
import Fire from '../../config/fire';

class Signup extends Component {
    constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this);
      this.signup = this.signup.bind(this);
      this.state = {
        email: '',
        password: '',
        name: '',
      }
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
     
     handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }
    
  render() {
    return (
        <div className={classes.loginForm}>
            <h1>Sign UP Here</h1>
            <label htmlFor="email">Name : </label>
            <input value={this.state.name} onChange={this.handleChange} type="text" name="name"/>
            <label htmlFor="email">Email Address : </label>
            <input value={this.state.email} onChange={this.handleChange} type="email" name="email" />
            <label htmlFor="email">Password : </label>
            <input value={this.state.password} onChange={this.handleChange} type="password" name="password" />
            <button type="submit" className={classes.loginBtn} onClick={this.props.toggle}>Back to Login</button>
            <button type="submit" className={classes.loginBtn} onClick={()=> this.signup}>Sign Up</button>
            </div>
    )
  }
}

export default Signup;