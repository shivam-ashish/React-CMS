import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import DisplayBlogs from '../containers/Blogs/DisplayBlogs';

let wrapped;

beforeEach(() => {
  wrapped = mount(<Router><DisplayBlogs val="xyz" /></Router>);
});
afterEach(() => {
  wrapped.unmount();
});

it('has a blog component structure', () => {
  expect(wrapped.find('div').length).toEqual(3);
  expect(wrapped.find('button').length).toEqual(2);
  expect(wrapped.find('h1').length).toEqual(1);
  expect(wrapped.find('p').length).toEqual(1);
});

it('contains right type for Buttons', () => {
  expect(wrapped.find('Button').at(0).prop('type')).toBe('X');
  expect(wrapped.find('Button').at(1).prop('type')).toBe('Edit');
  expect(wrapped.find('[type="X"]').at(0).text()).toBe('X');
  expect(wrapped.find('[type="Edit"]').at(1).text()).toBe('Edit');
});

