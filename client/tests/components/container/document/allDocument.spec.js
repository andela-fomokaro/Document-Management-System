import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import jsdom from 'jsdom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { shallow } from 'enzyme';
import rootReducer from '../../../../rootReducer';
import { AllDocument } from '../../../../components/document/AllDocument.jsx';

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

const confirmDelete = sinon.spy();

const props = {
  document: {
    id: '1',
    title: 'My God Is Good',
    content: 'Content',
  },
  confirmDelete,
  deleteDocument: () => {},
  user: { id: 1, roleId: 1 },
};

describe('AllDocument', () => {
  const wrapper = shallow(<Provider store={store}><AllDocument {...props} /></Provider>);
  it('renders a card div', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('receives the title from props', () => {
    expect(wrapper.find('.card-title').root.node.props.document.title).toEqual('My God Is Good');
  });
  it('receives the content from props', () => {
    expect(wrapper.find('.card-content').root.node.props.document.content).toEqual('Content');
  });
  it('receives the id from props', () => {
    expect(wrapper.find('.card-content').root.node.props.document.id).toEqual(1);
  });
});
