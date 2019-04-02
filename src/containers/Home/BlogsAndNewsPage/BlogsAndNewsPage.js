import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '../../../commonComponents/Button/Button';
import BtnClass from '../../../commonComponents/Button/Button.module.css';

const BlogsAndNewsPage = (props) => {
  const { path } = props.match;
  return (
    <>
      <Link to={`${path}/blogs`}>
        <Button
          type="BLOGS"
          className={BtnClass.blogs}
        >
          {'Blogs'}
        </Button>
      </Link>

      <Link to={`${path}/news`}>
        <Button
          type="NEWS"
          className={BtnClass.news}
        >
          {'NEWS'}
        </Button>
      </Link>
    </>
  );
};

export default withRouter(BlogsAndNewsPage);
