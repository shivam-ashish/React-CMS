import React, { Fragment } from 'react';
import { Consumer } from '../DataStore/MyContext';

const withContext = (WrappedComponent) => {
  return (
    (props) => {
      return(
        <Fragment>
          <Consumer>
            {(value) => {
              return (
                <WrappedComponent val={value} />
              );
            }}
          </Consumer>
        </Fragment>
      );
    }
  );
};

export default withContext;
