import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import AddEdit from '../containers/Blogs/AddEdit/AddEdit';
import store from '../store/rootReducer';

let wrapped;

beforeEach(() => {
  wrapped = mount(<Provider store={store}><Router><AddEdit props="xyz" /></Router></Provider>);
});
afterEach(() => {
  wrapped.unmount();
});

it('has a AddEdit component structure', () => {
  expect(wrapped.find('div').length).toEqual(2);
  expect(wrapped.find('h1').length).toEqual(1);
  expect(wrapped.find('input').length).toEqual(2);
});

it('has text fields where users can type in', () => {
  wrapped.find('#title').simulate('change', {
    target: { value: 'new title', name: 'title' },
  });
  wrapped.find('#body').simulate('change', {
    target: { value: 'new body', name: 'body' },
  });
  wrapped.update();
  expect(wrapped.find('#title').prop('value')).toEqual('new title');
  expect(wrapped.find('#body').prop('value')).toEqual('new body');
});
