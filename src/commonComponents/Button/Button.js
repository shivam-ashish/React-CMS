import React from 'react';

const Button = props => (
  <button
    type="button"
    onClick={props.click}
    {...props}
  >
    {props.children}
  </button>
);

export default Button;
