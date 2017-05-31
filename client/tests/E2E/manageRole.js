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
      .pause(5000)
      .assert.containsText('p.cardTitle',
      'Quick Tips On How To Onboard Quickly')
      .pause(5000)
      .click('#managerole')
      .assert.containsText('#roleTitle',
      'Title')
      .assert.containsText('#timeCreated',
      'Time Created')
      .assert.containsText('#lastUpdated',
      'Last Updated')
      .pause(2000)
      .click('#adminCreateRole')
      .setValue('Input[name=title]', faker.random.words())
      .click('#createRole')
      .pause(5000)
      .click('#deleteRole')
      .assert.containsText('#roleDeleteWord',
      '')
      .end(),
  'Update Role': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 3000)
      .click('#login')
      .setValue('Input[name=identifier]', 'omokarofaith@gmail.com')
      .setValue('Input[name=password]', 'random password')
      .click('button')
      .pause(2000)
      .assert.containsText('p.cardTitle',
      'Quick Tips On How To Onboard Quickly')
      .pause(5000)
      .click('#managerole')
      .pause(2000)
      .click('#updateRole')
      .setValue('Input[name=title]', 'regular')
      .click('#updateRoleButton')
      .end();
  }
};

