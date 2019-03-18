import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Add.module.css';

const Add = () => (
  <div>
    <Link to="/AddNewPost"><button className={classes.add}>ADD</button></Link>
  </div>
);

export default Add;
