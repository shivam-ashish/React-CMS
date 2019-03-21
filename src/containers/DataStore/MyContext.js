import React from 'react';

const MyContext = React.createContext(null);

const { Provider, Consumer } = MyContext;

export {
  Provider,
  Consumer,
};
