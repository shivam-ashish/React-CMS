import React from 'react';
import { create } from 'react-test-renderer';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Signup from '../containers/LoginForm/Signup';
import store from '../store/rootReducer';

let wrapped;

beforeEach(() => {
  wrapped = mount(<Provider store={store}><Router><Signup props="xyz" /></Router></Provider>);
});
afterEach(() => {
  wrapped.unmount();
});

it('has a AddEdit component structure', () => {
  expect(wrapped.find('div').length).toEqual(2);
  expect(wrapped.find('h1').length).toEqual(1);
  expect(wrapped.find('input').length).toEqual(3);
  expect(wrapped.find('label').length).toEqual(3);
  expect(wrapped.find('Button').length).toEqual(2);
});

it('has text fields where users can type in', () => {
  wrapped.find('#name').simulate('change', {
    target: { value: 'username', name: 'name' },
  });
  wrapped.find('#email').simulate('change', {
    target: { value: 'email address', name: 'email' },
  });
  wrapped.find('#password').simulate('change', {
    target: { value: 'password', name: 'password' },
  });
  wrapped.update();
  expect(wrapped.find('#name').prop('value')).toEqual('username');
  expect(wrapped.find('#email').prop('value')).toEqual('email address');
  expect(wrapped.find('#password').prop('value')).toEqual('password');
});

it('it matches the snapshot', () => {
  const component = create(wrapped);
  expect(component.toJSON()).toMatchSnapshot();
});
