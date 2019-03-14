import React, {Component} from 'react';
import classes from './LoginForm.module.css';
import fire from '../../config/fire';
import user from '../../assets/user.png';

class LoginForm extends Component{
  
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email : '',
      password : ''
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        console.log(error);
      });
  }

  signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).then((u)=>{console.log(u)})
    .catch((error) => {
        console.log(error);
      })
  }

  render(){
    return(
      <div className={classes.box}>
      <div className={classes.loginForm}>
      {/* <img src={user} className={classes.user}></img> */}
        <h1>Login Here</h1>
        <label htmlFor="email">Email Address : </label>
        <input value={this.state.email} onChange={this.handleChange}type="email" name="email"/>
        <label htmlFor="email">Password : </label>
        <input value={this.state.password} onChange={this.handleChange}type="password" name="password"/>
        <button type="submit" className={classes.loginBtn} onClick={this.login}>Login</button>
        <p>It's a Secure Login</p>
      {/* <button onClick={this.signup} style={{marginLeft: '25px'}} className='loginBtn'>Signup</button> */}
      </div>
      </div>
    );
  }
  
}

export default LoginForm;