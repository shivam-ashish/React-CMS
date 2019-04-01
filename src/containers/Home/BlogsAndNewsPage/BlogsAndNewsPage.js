import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '../../../commonComponents/Button/Button';

const BlogsAndNewsPage = (props) => {
  const { path } = props.match;
  return (
    <>
      <Link to={`${path}/blogs`}><Button type="BLOGS" /></Link>

      <Link to={`${path}/news`}><Button type="NEWS" /></Link>
    </>
  );
};

export default withRouter(BlogsAndNewsPage);
