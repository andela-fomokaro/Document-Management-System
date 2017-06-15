import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import jsdom from 'jsdom';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { singleDocument } from
  '../../../../components/document/singleDocument.jsx';
import rootReducer from '../../../../rootReducer';

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
const getSingleDocument = sinon.spy(() => Promise.resolve());
const props = {
  doc: [],
  getSingleDocument,
};


describe(' Test for Manage Users Component', () => {
  it('renders the Manage users component', () => {
    expect(<Provider store={store}><singleDocument /></Provider>);
  });
  it('renders Manage Users Table', () => {
    expect(<Provider store={store}><singleDocument {...props} /></Provider>);
    const wrapper = shallow(<singleDocument {...props} />);
    expect(wrapper.find('div').length).toEqual(true);
  });
});
