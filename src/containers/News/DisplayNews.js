import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../commonComponents/Button/Button';
import BtnClass from '../../commonComponents/Button/Button.module.scss';

const newsItem = (props) => {
  console.log(props);
  const { id, val, path } = props;
  return (
    <div>
      <p>Hello</p>
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
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
        {val.title}
      </div>
      {<br />}
      {val.body}
    </div>
  );
};

export default newsItem;
