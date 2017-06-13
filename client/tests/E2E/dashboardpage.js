import config from './config';

export default {
  'User Dashboard': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body', 3000)
      .click('#login')
      .setValue('Input[name=identifier]', 'omokarofaith@gmail.com')
      .setValue('Input[name=password]', 'random password')
      .click('button')
      .waitForElementVisible('#docButton', 3000)
      .assert.visible('#docButton')
      .click('#docButton')
      .waitForElementVisible('#docButton', 3000)
      .setValue('#input2[name=title]', 'Hi This Is My Diary')
      .click('#input1')
      .waitForElementVisible('#mceu_8', 5000)
      .click('#public')
      .waitForElementVisible('button#create', 3000)
      .click('button#create')
      .waitForElementVisible('#userDocSearch', 3000)
      .assert.visible('#userDocSearch')
      .setValue('Input#userDocSearch', 'Total')
      .end(),
  'Update user': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 3000)
      .click('#login')
      .setValue('Input[name=identifier]', 'omokarofaith@gmail.com')
      .setValue('Input[name=password]', 'random password')
      .click('button')
      .waitForElementVisible('#manageusers', 3000)
      .click('#manageusers')
      .waitForElementVisible('#tableName', 3000)
      .assert.containsText('#tableName',
      'Full Name')
      .assert.containsText('#updateRole',
      'Update Role')
      .end();
  },
};

