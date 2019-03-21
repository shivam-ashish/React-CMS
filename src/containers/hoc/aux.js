import React from 'react';

const wrapper = (WrappedComponent) => 
{
  return props => (
    <WrappedComponent>
      {props.children};
    </WrappedComponent>
  );
}

export default wrapper;