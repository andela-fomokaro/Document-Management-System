import faker from 'faker';
import config from './config';

export default {
  'Create Role': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body', 3000)
      .assert.containsText('#greetings',
      'Managing And Organizing Of Documents Just Got Better')
      .click('#login')
      .setValue('Input[name=identifier]', 'omokarofaith@gmail.com')
      .setValue('Input[name=password]', 'Ekhorowa')
      .click('button')
      .waitForElementVisible('#managerole', 3000)
      .click('#managerole')
      .assert.containsText('#roleTitle',
      'Title')
      .assert.containsText('#sn',
      'S/N')
      .assert.containsText('#timeCreated',
      'Time Created')
      .assert.containsText('#lastUpdated',
      'Last Updated')
      .waitForElementVisible('#adminCreateRole', 3000)
      .click('#adminCreateRole')
      .setValue('Input[name=title]', faker.random.words())
      .click('#createRole')
      .end(),
  'Delete Role': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 3000)
      .assert.containsText('#greetings',
      'Managing And Organizing Of Documents Just Got Better')
      .click('#login')
      .setValue('Input[name=identifier]', 'omokarofaith@gmail.com')
      .setValue('Input[name=password]', 'Ekhorowa')
      .click('button')
      .waitForElementVisible('#managerole', 3000)
      .click('#managerole')
      .assert.containsText('#roleTitle',
      'Title')
      .assert.containsText('#sn',
      'S/N')
      .click('#deleteRole')
      .click('button')
      .assert.containsText('#roleheader',
      'Manage Roles')
      .end();
  },
};

