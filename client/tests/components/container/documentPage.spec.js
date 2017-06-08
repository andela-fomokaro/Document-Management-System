import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import jsdom from 'jsdom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import LoadDocument from
  '../../../components/LoadDocuments';
import DashboardPage from
  '../../../components/DashBoardPage';
import rootReducer from '../../../rootReducer';
import DocumentForm from '../../../components/document/DocumentForm';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )
);
const deleteDocument = sinon.spy(() => Promise.resolve());
const getDocument = sinon.spy(() => Promise.resolve());
const searchDocument = sinon.spy(() => Promise.resolve());
const loadDocuments = sinon.spy(() => Promise.resolve());

const props = {
  deleteDocument,
  getDocument,
  searchDocument,
  loadDocuments
};


describe(' Test for Load Document Page Component', () => {
  it('renders the load document component', () => {
    expect(<Provider store={store}><LoadDocument /></Provider>);
  });
  it('renders Document Form', () => {
    expect(<Provider store={store}><LoadDocument {...props} /></Provider>);
    const wrapper = mount(<Provider store={store}><LoadDocument {...props} /></Provider>);
    expect(wrapper.contains(<DocumentForm />)).toEqual(true);
  });
  it('should contain an h2 tag', () => {
    expect(<Provider store={store}><LoadDocument {...props} /></Provider>);
    const wrapper = mount(<Provider store={store}><LoadDocument {...props} /></Provider>);
    expect(wrapper.find('h2').text()).toEqual('All Documents');
  });
  it('should return the length of document form as 1', () => {
    expect(<Provider store={store}><DashboardPage {...props} /></Provider>);
    const wrapper = mount(<Provider store={store}><LoadDocument {...props} /></Provider>);
    expect(wrapper.find('DocumentForm').length).toBe(1);
  });
  it('controls the search form input field', () => {
    const wrapper = mount(<Provider store={store}><LoadDocument {...props} /></Provider>);
    wrapper.find('input[name="search"]')
      .simulate('change', { target: { name: 'search' } });
    expect(wrapper.find('input[name="search"]').prop('placeholder')).toEqual('Search for document here...');
  });
  it('can perform a search', () => {
    const wrapper = mount(<Provider store={store}><LoadDocument {...props} /></Provider>);
    wrapper.find('input[name="search"]')
    .simulate('change', { target: { name: 'search', value: 'extended' } });
    wrapper.find('form').simulate('submit');
  });
  it('does not submit the form if a required field is missing or empty', () => {
    const wrapper = mount(<Provider store={store}><DocumentForm /></Provider>);
    wrapper.setState({ access: 'public', title: '' });
    wrapper.instance().onSubmit({ preventDefault: () => {} });
    expect(DocumentForm.callCount).toBe(0);
  });
});

describe(' Test for Dashboard Component', () => {
  it('renders the dashboard component', () => {
    expect(<Provider store={store}><DashboardPage /></Provider>);
  });
  it('renders Document Form', () => {
    expect(<Provider store={store}><DashboardPage {...props} /></Provider>);
    const wrapper = mount(<Provider store={store}><DashboardPage {...props} /></Provider>);
    expect(wrapper.contains(<DocumentForm />)).toEqual(true);
  });
  it('should contain an h2 tag', () => {
    expect(<Provider store={store}><DashboardPage {...props} /></Provider>);
    const wrapper = mount(<Provider store={store}><DashboardPage {...props} /></Provider>);
    expect(wrapper.find('h2').text()).toEqual('My Documents');
  });
  it('should return the length of document form as 1', () => {
    expect(<Provider store={store}><DashboardPage {...props} /></Provider>);
    const wrapper = mount(<Provider store={store}><DashboardPage {...props} /></Provider>);
    expect(wrapper.find('DocumentForm').length).toBe(1);
  });
  it('controls the search form input field', () => {
    const wrapper = mount(<Provider store={store}><DashboardPage {...props} /></Provider>);
    wrapper.find('input[name="search"]')
      .simulate('change', { target: { name: 'search' } });
    expect(wrapper.find('input[name="search"]').prop('placeholder')).toEqual('Search for document here...');
  });
  it('can perform a search', () => {
    const wrapper = mount(<Provider store={store}><DashboardPage {...props} /></Provider>);
    wrapper.find('input[name="search"]')
    .simulate('change', { target: { name: 'search', value: 'extended' } });
    wrapper.find('form').simulate('submit');
  });
});
