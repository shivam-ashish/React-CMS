import React, { Component } from 'react';
import firebase from 'firebase';
import Fire from '../../config/fire';
const MyContext = React.createContext();
const { Provider, Consumer } = MyContext;
export {
  Provider,
  Consumer,
};

class MyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      display: false,
    };
  }

  render() {
    return (
      <div>
        <MyContext.Provider value={{
          state: this.state,
        }}
        >
          {this.props.children}
        </MyContext.Provider>
      </div>
    );
  }
}

export default MyContext;
