import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '../../../commonComponents/Button/Button';
import BtnClass from '../../../commonComponents/Button/Button.module.scss';
import blogs from '../../../assets/blog.jpg';
import classes from '../Home.module.scss';
import news from '../../../assets/news.png';

const BlogsAndNewsPage = (props) => {
  const { path } = props.match;
  return (
    <>
      <Link to={`${path}/blogs`}>
        <Button
          type="BLOGS"
          className={BtnClass.blogs}
        >
          <div className={classes.blogsBackground}>
            <img
              alt="Blogs Logo"
              className={classes.blogsIcon}
              src={blogs}
            />
          </div>
          {/* <p>{'Blogs'}</p> */}
        </Button>
      </Link>

      <Link to={`${path}/news`}>
        <Button
          type="NEWS"
          className={BtnClass.news}
        >
        <div className={classes.blogsBackground}>
            <img
              alt="News Logo"
              className={classes.blogsIcon}
              src={news}
            />
          </div>
          {/* {'NEWS'} */}
        </Button>
      </Link>
    </>
  );
};

export default withRouter(BlogsAndNewsPage);
