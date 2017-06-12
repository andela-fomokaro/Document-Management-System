import config from './config';

export default {
  'Search For Users': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body', 3000)
      .click('#login')
      .setValue('Input[name=identifier]', 'omokarofaith@gmail.com')
      .setValue('Input[name=password]', 'random password')
      .click('button')
      .waitForElementVisible('#manageusers', 3000)
      .click('#manageusers')
      .waitForElementVisible('Input#documentSearch', 3000)
      .setValue('Input#documentSearch', 'ijay')
      .assert.containsText('#searchUsername', 'Ijay')
      .waitForElementVisible('body', 3000)
      .setValue('Input#documentSearch', 'mininie')
      .end(),
};

