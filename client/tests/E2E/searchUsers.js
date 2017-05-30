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
      .pause(5000)
      .assert.containsText('p.cardTitle',
      'Quick Tips On How To Onboard Quickly')
      .pause(5000)
      .click('#manageusers')
      .pause(2000)
      .setValue('Input#documentSearch', 'noxyblaze')
      .assert.containsText('#searchUsername', 'noxyblaze')
      .pause(2000)
      .end(),
};
