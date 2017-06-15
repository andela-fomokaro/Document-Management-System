import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import jsdom from 'jsdom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../../../../rootReducer';
import CreateRole from '../../../../components/role/CreateRole.jsx';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f,
  ),
);

const createRole = sinon.spy(() => Promise.resolve());

const props = {
  createRole,
};


describe(' Test for Load Document Page Component', () => {
  it('renders the load document component', () => {
    expect(<Provider store={store}><CreateRole /></Provider>);
  });
  it('should render create role form', () => {
    const wrapper = mount(<Provider store={store}><CreateRole {...props} /></Provider>);
    expect(wrapper.find('CreateRole').length).toBe(1);
  });
  it('return the length of wrapper to be 1', () => {
    const wrapper = mount(<Provider store={store}><CreateRole {...props} /></Provider>);
    expect((wrapper).length).toBe(1);
  });
  it('should return the length of create role form as 1', () => {
    const wrapper = mount(<Provider store={store}><CreateRole {...props} /></Provider>);
    expect(wrapper.find('Modal').length).toBe(1);
  });
});
