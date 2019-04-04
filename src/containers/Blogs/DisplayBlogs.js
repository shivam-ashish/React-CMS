import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../commonComponents/Button/Button';
import BtnClass from '../../commonComponents/Button/Button.module.scss';

const blogItem = (props) => {
  console.log('value of props in displayBlogs', props);
  const { path, id, val } = props;
  return (
    <div>
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
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
            onClick={() => props.editHandler(val.title, val.body)}
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

export default blogItem;
