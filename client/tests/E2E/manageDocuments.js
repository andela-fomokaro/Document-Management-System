import config from './config';

export default {
  'User Dashboard': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body', 3000)
      .assert.containsText('#greetings',
      'Managing And Organizing Of Documents Just Got Better')
      .click('#login')
      .setValue('Input[name=identifier]', 'omokarofaith@gmail.com')
      .setValue('Input[name=password]', 'Ekhorowa')
      .click('button')
      .waitForElementVisible('#title-header', 2000)
      .waitForElementVisible('#docButton', 2000)
      .click('#docButton')
      .waitForElementVisible('#docButton', 3000)
      .waitForElementVisible('#create', 3000)
      .waitForElementVisible('#cardTitle', 3000)
      .assert.containsText('#title-header',
      'My Documents')
      .end(),
  'Search Document': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 3000)
      .assert.containsText('#greetings',
      'Managing And Organizing Of Documents Just Got Better')
      .click('#login')
      .setValue('Input[name=identifier]', 'omokarofaith@gmail.com')
      .setValue('Input[name=password]', 'Ekhorowa')
      .click('button')
      .waitForElementVisible('#title-header', 2000)
      .waitForElementVisible('#docButton', 2000)
      .setValue('Input#userDocSearch', 'Set State')
      .waitForElementVisible('#cardTitle', 3000)
      .assert.containsText('#cardTitle',
      'Set State')
      .end();
  },
  'Create Document': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 3000)
      .assert.containsText('#greetings',
      'Managing And Organizing Of Documents Just Got Better')
      .click('#login')
      .setValue('Input[name=identifier]', 'omokarofaith@gmail.com')
      .setValue('Input[name=password]', 'Ekhorowa')
      .click('button')
      .waitForElementVisible('#title-header', 2000)
      .waitForElementVisible('#docButton', 2000)
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
      .end();
  },
  'Update Document': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 3000)
      .assert.containsText('#greetings',
      'Managing And Organizing Of Documents Just Got Better')
      .click('#login')
      .setValue('Input[name=identifier]', 'omokarofaith@gmail.com')
      .setValue('Input[name=password]', 'Ekhorowa')
      .click('button')
      .waitForElementVisible('#title-header', 2000)
      .waitForElementVisible('#docButton', 2000)
      .click('#updatedocumentfield')
      .setValue('#input2[name=title]', 'Update Document')
      .click('#updated')
      .waitForElementVisible('#userDocSearch', 3000)
      .assert.visible('#userDocSearch')
      .end();
  },
  'Delete Document': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 3000)
      .assert.containsText('#greetings',
      'Managing And Organizing Of Documents Just Got Better')
      .click('#login')
      .setValue('Input[name=identifier]', 'omokarofaith@gmail.com')
      .setValue('Input[name=password]', 'Ekhorowa')
      .click('button')
      .waitForElementVisible('#title-header', 2000)
      .waitForElementVisible('#docButton', 2000)
      .click('#userDocDelete')
      .click('button')
      .waitForElementVisible('#userDocSearch', 3000)
      .assert.visible('#userDocSearch')
      .end();
  },
};
