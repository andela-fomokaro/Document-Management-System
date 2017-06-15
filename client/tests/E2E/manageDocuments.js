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
      .waitForElementVisible('body#tinymce.mce-contentbody', 5000)
      .setValue('#7', 'This is a tiny mce content')
      .click('#public')
      .waitForElementVisible('button#create', 3000)
      .click('button#create')
      .waitForElementVisible('#cardTitle', 3000)
      .assert.containsText('#cardTitle',
      'Hi This Is My Diary')
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
      .waitForElementVisible('textarea', 3000)
      .setValue('textarea[name=title]', 'This Will Update Document')
      .click('#updated')
      .waitForElementVisible('#cardTitle', 3000)
      .assert.containsText('#cardTitle',
      'This Will Update Document')
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
      .assert.containsText('#title-header',
      'My Documents')
      .waitForElementVisible('#userDocSearch', 3000)
      .end();
  },
};
