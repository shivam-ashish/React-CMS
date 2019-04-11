import React from 'react';
import { render } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import DisplayBlogs from '../containers/Blogs/DisplayBlogs';

it('has a blog component structure', () => {
  const wrapped = render(<Router><DisplayBlogs val="xyz" /></Router>);
  expect(wrapped.find('div').length).toEqual(2);
  expect(wrapped.find('button').length).toEqual(2);
  expect(wrapped.find('h1').length).toEqual(1);
  expect(wrapped.find('p').length).toEqual(1);
});
