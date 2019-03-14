import React, { Component } from 'react';

const MyContext = React.createContext();
const { Provider, Consumer } = MyContext
export {
  Provider,
  Consumer
}

class MyProvider extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        name: '',
      }
    }
    
  render() {
    return (
      <div>
        <MyContext.Provider value={{ state: this.state }}>
            {this.props.children}
        </MyContext.Provider>
      </div>
    )
  }
}

export default MyContext;
