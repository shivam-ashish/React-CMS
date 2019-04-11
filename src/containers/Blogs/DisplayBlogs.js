import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../commonComponents/Button/Button';
import BtnClass from '../../commonComponents/Button/Button.module.scss';
import classes from './Blogs.module.scss';

const blogItem = (props) => {
  const { path, id, val } = props;
  const { title, body } = val;
  return (
    <div>
      <div className={classes.upperSection}>
        <Button
          type="X"
          className={BtnClass.delete}
          onClick={() => props.deleteData(id)}
        >
          {'X'}
        </Button>
        <Link
          to={`${path}/editpost/${id}/edit`}
        >
          <Button
            type="Edit"
            className={BtnClass.edit}
            onClick={() => props.editHandler(title, body)}
          >
            {'Edit'}
          </Button>
        </Link>
        <h1 className={classes.heading}>{title}</h1>
      </div>
      {<br />}
      <div className={classes.lowerSection}>
        <p>{body}</p>
      </div>
    </div>
  );
};

export default blogItem;
