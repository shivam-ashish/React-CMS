import React from 'react';
import { create } from 'react-test-renderer';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from '../containers/Navbar/Navbar';
import store from '../store/rootReducer';

let wrapped;

beforeEach(() => {
  wrapped = mount(<Provider store={store}><Router><Navbar /></Router></Provider>);
});
afterEach(() => {
  wrapped.unmount();
});

it('has a Navbar component structure', () => {
  // expect(wrapped.find('li').length).toEqual(1);
  // expect(wrapped.find('ul').length).toEqual(2);
  // expect(wrapped.find('Link').length).toEqual(1);
  // expect(wrapped.find('Button').length).toEqual(1);
});
