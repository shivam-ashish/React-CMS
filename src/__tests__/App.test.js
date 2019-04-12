import React from 'react';
import { mount } from 'enzyme';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../store/rootReducer';

let wrapped;

beforeEach(() => {
  wrapped = mount(<Provider store={store}><App /></Provider>);
});
afterEach(() => {
  wrapped.unmount();
});

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(wrapped, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('checks the Routes', () => {
  expect(wrapped.find('Route').length).toEqual(2);
  expect(wrapped.find('Route').at(0).prop('path')).toEqual('/auth');
});
