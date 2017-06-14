import faker from 'faker';
import config from './config';

export default {
  'SignUp A User': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body', 3000)
      .assert.containsText('#greetings',
      'Managing And Organizing Of Documents Just Got Better')
      .click('#signup')
      .setValue('Input[name=username]', faker.name.findName())
      .setValue('Input[name=email]', faker.internet.email())
      .setValue('Input[name=fullNames]', faker.name.findName())
      .setValue('Input[name=password]', 'unique')
      .setValue('Input[name=passwordConfirmation]', 'unique')
      .click('button')
      .waitForElementVisible('a.view', 5000)
      .assert.containsText('a.view',
      'assignment')
      .end(),
  'Invalid Sign Up': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 3000)
      .click('#signup')
      .setValue('Input[name=username]', 'andela')
      .setValue('Input[name=email]', 'andela@gmail.com')
      .setValue('Input[name=fullNames]', 'qwerty')
      .setValue('Input[name=password]', 'qwerty')
      .setValue('Input[name=passwordConfirmation]', 'Andela')
      .click('button')
      .waitForElementVisible('body', 3000)
      .assert.urlContains('signup')
      .end();
  },
};
