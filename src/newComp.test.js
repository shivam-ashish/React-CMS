import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import NewComp from './newComp';
import App from './App';

it('should render', () => {
  // const div = document.createElement('div');
  // ReactDOM.render(<NewComp />, div);
  // expect(div.innerHTML).toContain('Hey');
  // ReactDOM.unmountComponentAtNode(div);

  const wrapped = shallow(<NewComp />);
  expect(wrapped.find(App).length).toEqual(0);

});
