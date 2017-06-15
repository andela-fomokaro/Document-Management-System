import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import jsdom from 'jsdom';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../../../../rootReducer';
import { DashBoardPage } from
  '../../../../components/DashBoardPage.jsx';
import DocumentForm from '../../../../components/document/DocumentForm.jsx';

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
const deleteDocument = sinon.spy(() => Promise.resolve());
const getDocument = sinon.spy(() => Promise.resolve());
const searchDocument = sinon.spy(() => Promise.resolve());
const loadDocuments = sinon.spy(() => Promise.resolve());

const props = {
  documents: [{
    id: '1',
    title: 'My God Is Good',
    content: 'Content',
  }],
  pagination: {},
  deleteDocument,
  getDocument,
  searchDocument,
  loadDocuments,
};


describe(' Test for Load Document Page Component', () => {
  it('renders Load Document Page div', () => {
    const wrapper = shallow(<DashBoardPage {...props} />);
    expect(wrapper.find('div').length).toEqual(7);
  });
  it('should contain an h2 tag', () => {
    expect(<Provider store={store}><DashBoardPage {...props} /></Provider>);
    const wrapper = shallow(<DashBoardPage {...props} />);
    expect(wrapper.find('h2').text()).toEqual('My Documents');
  });
  it('should return the length of document form as 1', () => {
    expect(<Provider store={store}><DashBoardPage {...props} /></Provider>);
    const wrapper = shallow(<DashBoardPage {...props} />);
    expect(wrapper.find('form').length).toBe(1);
  });
  it('should return the length of document search as 1', () => {
    expect(<Provider store={store}><DashBoardPage {...props} /></Provider>);
    const wrapper = shallow(<DashBoardPage {...props} />);
    expect(wrapper.find('input[name="search"]').length).toBe(1);
  });
  it('renders a card div', () => {
    const wrapper = shallow(<DashBoardPage {...props} />);
    expect(wrapper.length).toEqual(1);
  });
  it('renders the document form', () => {
    expect(<Provider store={store}><DashBoardPage {...props} /></Provider>);
    const wrapper = shallow(<DashBoardPage {...props} />);
    expect(wrapper.contains(<DocumentForm />)).toEqual(true);
  });
});
