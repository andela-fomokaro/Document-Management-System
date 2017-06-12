import config from './config';

export default {
  'Login a user': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body', 3000)
      .click('#login')
      .setValue('Input[name=identifier]', 'omokarofaith@gmail.com')
      .setValue('Input[name=password]', 'random password')
      .click('button')
      .waitForElementVisible('a.view', 3000)
      .assert.containsText('a.view',
      'Edit Profile')
      .end(),
  'Invalid login': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 3000)
      .click('#login')
      .setValue('Input[name=identifier]', 'pap@test')
      .setValue('Input[name=password]', 'qwerty')
      .click('button')
      .waitForElementVisible('body', 3000)
      .assert.urlContains('login')
      .end();
  }
};
