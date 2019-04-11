import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import NewComp from './newComp';
import App from './App';

let wrapped;

beforeEach(() => {
  wrapped = mount(<NewComp />);
});
afterEach(() => {
  wrapped.unmount();
});

it('should render', () => {
  // const div = document.createElement('div');
  // ReactDOM.render(<NewComp />, div);
  // expect(div.innerHTML).toContain('Hey');
  // ReactDOM.unmountComponentAtNode(div);

  expect(wrapped.find('textarea').length).toEqual(1);
  expect(wrapped.find('button').length).toEqual(1);


});
