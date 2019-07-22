import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import jsdom from 'jsdom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../../../../rootReducer';
import ManageRole from
  '../../../../components/role/ManageRoles.jsx';
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
const deleteRole = sinon.spy(() => Promise.resolve());
const getRoles = sinon.spy(() => Promise.resolve());
const createRole = sinon.spy(() => Promise.resolve());

const props = {
  createRole,
  deleteRole,
  getRoles,
};


describe(' Test for Load Document Page Component', () => {
  it('renders the load document component', () => {
    expect(<Provider store={store}><ManageRole /></Provider>);
  });
  it('renders h2 header', () => {
    const wrapper = mount(<Provider store={store}><ManageRole {...props} /></Provider>);
    expect(wrapper.find('h2').text()).toEqual('Manage Roles');
  });
  it('should render create role form', () => {
    const wrapper = mount(<Provider store={store}><ManageRole {...props} /></Provider>);
    expect(wrapper.find('CreateRole').length).toBe(1);
  });
  it('return the length of wrapper to be 1', () => {
    const wrapper = mount(<Provider store={store}><CreateRole {...props} /></Provider>);
    expect((wrapper).length).toBe(1);
  });
  it('should return the length of the roles table as 1', () => {
    const wrapper = mount(<Provider store={store}><ManageRole {...props} /></Provider>);
    expect(wrapper.find('table').length).toBe(1);
  });
  it('should return the length of div  1', () => {
    const wrapper = mount(<Provider store={store}><ManageRole {...props} /></Provider>);
    expect(wrapper.find('div').length).toBe(5);
  });
  it('should return the length of container as 1', () => {
    const wrapper = mount(<Provider store={store}><ManageRole {...props} /></Provider>);
    expect(wrapper.find('.container').length).toBe(1);
  });
});
