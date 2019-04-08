import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../commonComponents/Button/Button';
import BtnClass from '../../commonComponents/Button/Button.module.scss';
import classes from './News.module.scss';

const newsItem = (props) => {
  const { id, val, path } = props;

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
          to={`${path}/editnews/${id}/edit`}
        >
          <Button
            type="Edit"
            className={BtnClass.edit}
            onClick={
              () => props.editHandler(val.title, val.body)
            }
          >
            {'Edit'}
          </Button>
        </Link>
        <h1 className={classes.heading}>{val.title}</h1>
      </div>
      {<br />}
      <div className={classes.lowerSection}>
        <p>{val.body}</p>
      </div>
    </div>
  );
};

export default newsItem;
