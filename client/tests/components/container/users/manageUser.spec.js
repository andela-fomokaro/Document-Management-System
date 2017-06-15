import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import jsdom from 'jsdom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import ManageUsers from
  '../../../components/users/ManageUsers';
import UserProfile from '../../../components/users/UserProfile.jsx';
import rootReducer from '../../../rootReducer';
import CreateUsers from '../../../components/users/CreateUsers.jsx';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  ),
);
const deleteUser = sinon.spy(() => Promise.resolve());
const getUsers = sinon.spy(() => Promise.resolve());
const searchUsers = sinon.spy(() => Promise.resolve());
const createUsers = sinon.spy(() => Promise.resolve());
const updateUser = sinon.spy(() => Promise.resolve());

const props = {
  deleteUser,
  getUsers,
  searchUsers,
  createUsers,
  updateUser,
};


describe(' Test for Manage Users Component', () => {
  it('renders the Manage users component', () => {
    expect(<Provider store={store}><ManageUsers /></Provider>);
  });
  it('renders Manage Users Table', () => {
    expect(<Provider store={store}><ManageUsers {...props} /></Provider>);
    const wrapper = mount(<Provider store={store}><ManageUsers {...props} /></Provider>);
    expect(wrapper.contains(<CreateUsers/>)).toEqual(true);
  });
  it('should contain an h2 tag', () => {
    expect(<Provider store={store}><ManageUsers {...props} /></Provider>);
    const wrapper = mount(<Provider store={store}><ManageUsers {...props} /></Provider>);
    expect(wrapper.find('h2').text()).toEqual('Manage Users');
  });
  it('should return the length of Users form as 1', () => {
    expect(<Provider store={store}><ManageUsers {...props} /></Provider>);
    const wrapper = mount(<Provider store={store}><ManageUsers {...props} /></Provider>);
    expect(wrapper.find('CreateUsers').length).toBe(1);
  });
  it('controls the search form input field', () => {
    const wrapper = mount(<Provider store={store}><ManageUsers {...props} /></Provider>);
    wrapper.find('input[name="search"]')
      .simulate('change', { target: { name: 'search' } });
    expect(wrapper.find('input[name="search"]').prop('placeholder')).toEqual('Search for users here...');
  });
  it('can perform a search', () => {
    const wrapper = mount(<Provider store={store}><ManageUsers {...props} /></Provider>);
    wrapper.find('input[name="search"]')
    .simulate('change', { target: { name: 'search', value: 'Ijay' } });
    wrapper.find('form').simulate('submit');
  });
  it('does not submit the create users form if a required field is missing or empty', () => {
    const wrapper = mount(<Provider store={store}><createUsers /></Provider>);
    wrapper.setState({ username: 'public', fullNames: '' });
    wrapper.instance().onSubmit({ preventDefault: () => {} });
    expect(createUsers.callCount).toBe(0);
  });
});

describe(' Test for Users Profile', () => {
  it('renders the Users Profile component', () => {
    expect(<Provider store={store}><UserProfile /></Provider>);
  });
  it('should contain an h2 tag', () => {
    expect(<Provider store={store}><UserProfile {...props} /></Provider>);
    const wrapper = mount(<Provider store={store}><UserProfile {...props} /></Provider>);
    expect(wrapper.find('h2').text()).toEqual('My Profile');
  });
});
