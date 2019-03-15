import React, { Component } from 'react'
import main from '../Background/Background.module.css';
import classes from './Blogs.module.css';
// eslint-disable-next-line react/prefer-stateless-function
class Blogs extends Component {
  render() {
    return (
      <div className={main.box}>
        <h1>Blogs</h1>
      </div>
    )
  }
}

export default Blogs;
