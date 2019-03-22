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
                <WrappedComponent val={value} props={props} />
              );
            }}
          </Consumer>
        </Fragment>
      );
    }
  );
};

export default withContext;
