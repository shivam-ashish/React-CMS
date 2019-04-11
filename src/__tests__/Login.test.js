import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from '../containers/LoginForm/Login';
import store from '../store/rootReducer';

let wrapped;

beforeEach(() => {
  wrapped = mount(<Provider store={store}><Router><Login props="xyz" /></Router></Provider>);
});
afterEach(() => {
  wrapped.unmount();
});

it('has a Login component structure', () => {
  expect(wrapped.find('div').length).toEqual(1);
  expect(wrapped.find('h1').length).toEqual(1);
  expect(wrapped.find('input').length).toEqual(2);
  expect(wrapped.find('label').length).toEqual(2);
  expect(wrapped.find('Button').length).toEqual(2);
});

it('has text fields where users can type in', () => {
  wrapped.find('#email').simulate('change', {
    target: { value: 'username', name: 'email' },
  });
  wrapped.find('#password').simulate('change', {
    target: { value: 'password', name: 'password' },
  });
  wrapped.update();
  expect(wrapped.find('#email').prop('value')).toEqual('username');
  expect(wrapped.find('#password').prop('value')).toEqual('password');
});
