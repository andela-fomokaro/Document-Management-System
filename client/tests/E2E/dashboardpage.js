import faker from 'faker';
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
      .assert.containsText('p.cardTitle',
      'Quick Tips On How To Onboard Quickly')
      .pause(5000)
      .click('#manageusers')
      .assert.containsText('#roleid',
      'Role Id')
      .assert.containsText('#createdTime',
      'Time Created')
      .assert.containsText('#updatedTime',
      'Last Updated')
      .pause(2000)
      .click('#adminCreateModal')
      .setValue('Input[name=username]', faker.name.findName())
      .setValue('Input[name=email]', faker.internet.email())
      .setValue('Input[name=fullNames]', faker.name.findName())
      .setValue('Input[name=password]', 'unique')
      .setValue('Input[name=passwordConfirmation]', 'unique')
      .click('#adminCreateUser')
      .pause(5000)
      .click('#deleteButton')
      .assert.containsText('#userDeleteButton',
      '')
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
      .assert.containsText('p.cardTitle',
      'Quick Tips On How To Onboard Quickly')
      .pause(5000)
      .click('#manageusers')
      .pause(2000)
      .click('#updateUser')
      .setValue('Input[name=username]', faker.name.findName())
      .setValue('Input[name=email]', faker.internet.email())
      .setValue('Input[name=fullNames]', faker.name.findName())
      .setValue('Input[name=role]', 2)
      .click('#adminUpdate')
      .end();
  }
};

