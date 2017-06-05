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
      .pause(5000)
      .assert.visible('#docButton')
      .click('#docButton')
      .pause(5000)
      .setValue('#input2[name=title]', 'Hi This Is My Diary')
      .click('#input1')
      .pause(2000)
      .click('#public')
      .setValue('#input3[name=content]', 'My Book Of Bible Story')
      .pause(5000)
      .click('button#create')
      .pause(3000)
      .click('#cancel')
      .pause(3000)
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
      .pause(2000)
      .click('#manageusers')
      .pause(2000)
      .assert.containsText('#tableName',
      'Full Name')
      .assert.containsText('#updateRole',
      'Update Role')
      .pause(2000)
      .end();
  }
};

