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
      .pause(5000)
      .assert.containsText('a.view',
      'Logout')
      .pause(5000)
      .end(),
  'Invalid login': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 3000)
      .click('#login')
      .setValue('Input[name=identifier]', 'pap@test')
      .setValue('Input[name=password]', 'qwerty')
      .click('button')
      .pause(1000)
      .assert.urlContains('login')
      .end();
  }
};
