import faker from 'faker';
import config from './config';

export default {
  'Manage Roles': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body', 3000)
      .click('#login')
      .setValue('Input[name=identifier]', 'omokarofaith@gmail.com')
      .setValue('Input[name=password]', 'random password')
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
      .waitForElementVisible('#deleteRole', 5000)
      .click('#deleteRole')
      .end()
};

