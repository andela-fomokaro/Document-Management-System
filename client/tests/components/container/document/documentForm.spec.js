import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import jsdom from 'jsdom';
import { shallow } from 'enzyme';
import { DocumentForm } from '../../../../components/document/DocumentForm.jsx';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

const createDocumentForm = sinon.spy();

const props = {
  document: {
    id: '1',
    title: 'My God Is Good',
    content: 'Content',
  },
  createDocumentForm,
  createDocument: () => {},
  documment: { title: 'The games', content: 'yoppie', id: 4 },
};

describe('AllDocument', () => {
  const wrapper = shallow(<DocumentForm {...props} />);
  it('renders a card div', () => {
    expect(wrapper.length).toEqual(1);
  });
  it('renders Document Form div', () => {
    expect(wrapper.find('div').length).toEqual(4);
  });
  it('should render a modal', () => {
    expect(wrapper.find('Modal').length).toEqual(1);
  });
  it('should render an input', () => {
    expect(wrapper.find('Input').length).toEqual(1);
  });
});
