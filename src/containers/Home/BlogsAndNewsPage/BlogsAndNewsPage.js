import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import classes from '../Home.module.css';

const BlogsAndNewsPage = (props) => {
  const { path } = props.match;
  return (
    <>
      <Link to={`${path}/blogs`}><button type="button" className={classes.blogs}>BLOGS</button></Link>

      <Link to={`${path}/news`}><button type="button" className={classes.news}>NEWS</button></Link>
    </>
  );
};

export default withRouter(BlogsAndNewsPage);
