import faker from 'faker';
import config from './config';

export default {
  // 'Search For Users': browser =>
  //   browser
  //     .url(config.url)
  //     .waitForElementVisible('body', 3000)
  //     .assert.containsText('#greetings',
  //     'Managing And Organizing Of Documents Just Got Better')
  //     .click('#login')
  //     .setValue('Input[name=identifier]', 'omokarofaith@gmail.com')
  //     .setValue('Input[name=password]', 'Ekhorowa')
  //     .click('button')
  //     .waitForElementVisible('#manageusers', 3000)
  //     .click('#manageusers')
  //     .waitForElementVisible('Input#documentSearch', 3000)
  //     .setValue('Input#documentSearch', 'ijay')
  //     .assert.containsText('#username-col', 'Ijay')
  //     .end(),
  // 'Update User Role': (browser) => {
  //   browser
  //     .url(config.url)
  //     .waitForElementVisible('body', 3000)
  //     .assert.containsText('#greetings',
  //     'Managing And Organizing Of Documents Just Got Better')
  //     .click('#login')
  //     .setValue('Input[name=identifier]', 'omokarofaith@gmail.com')
  //     .setValue('Input[name=password]', 'Ekhorowa')
  //     .click('button')
  //     .waitForElementVisible('#manageusers', 3000)
  //     .click('#manageusers')
  //     .waitForElementVisible('#tableName', 3000)
  //     .assert.containsText('#tableName',
  //     'Full Name')
  //     .assert.containsText('#updateRole',
  //     'Update Role')
  //     .end();
  // },
  'Create User': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 3000)
      .assert.containsText('#greetings',
      'Managing And Organizing Of Documents Just Got Better')
      .click('#login')
      .setValue('Input[name=identifier]', 'omokarofaith@gmail.com')
      .setValue('Input[name=password]', 'Ekhorowa')
      .click('button')
      .waitForElementVisible('#manageusers', 3000)
      .click('#manageusers')
      .waitForElementVisible('Input#documentSearch', 3000)
      .click('#createuser')
      .setValue('Input[name=username]', faker.name.findName())
      .setValue('Input[name=email]', faker.internet.email())
      .setValue('Input[name=fullNames]', 'bunmi')
      .setValue('Input[name=password]', 'unique')
      .setValue('Input[name=passwordConfirmation]', 'unique')
      .click('button')
      .waitForElementVisible('Input#documentSearch', 3000)
      .setValue('Input#documentSearch', 'bunmi')
      .assert.containsText('#fulname-col', 'bunmi')
      .assert.containsText('#updateRole',
      'Update Role')
      .end();
  },
  'Delete User': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 3000)
      .assert.containsText('#greetings',
      'Managing And Organizing Of Documents Just Got Better')
      .click('#login')
      .setValue('Input[name=identifier]', 'omokarofaith@gmail.com')
      .setValue('Input[name=password]', 'Ekhorowa')
      .click('button')
      .waitForElementVisible('#manageusers', 3000)
      .click('#manageusers')
      .waitForElementVisible('Input#documentSearch', 3000)
      .click('#deleteusericon')
      .click('button')
      .assert.containsText('#updateRole',
      'Update Role')
      .end();
  },
};

