import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../../../components/login/LoginForm';


function setup() {
  const props = {
    userData: { identifier: '', errors: {}, password: '' },
    onSubmit: () => {},
    onChange: () => {},
  };

  return shallow(<LoginForm {...props} />);
}

describe('LoginForm', () => {
  it('renders  text inputs for both email/identifier and password', () => {
    const wrapper = setup();
    expect(wrapper.find('TextInput').length).toEqual(2);
    expect(wrapper.find('TextInput').first().prop('name')).toBe('identifier');
    expect(wrapper.find('TextInput').last().prop('name')).toBe('password');
  });
  it('renders the login button', () => {
    const wrapper = setup();
    expect(wrapper.find('button').length).toEqual(1);
  });
});
