import config from './config';

export default {
  'Update My Profile': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 3000)
      .assert.containsText('#greetings',
      'Managing And Organizing Of Documents Just Got Better')
      .click('#login')
      .setValue('Input[name=identifier]', 'omokarofaith@gmail.com')
      .setValue('Input[name=password]', 'Ekhorowa')
      .click('button')
      .waitForElementVisible('#myprofile', 3000)
      .click('#myprofile')
      .waitForElementVisible('#profileheader', 3000)
      .assert.containsText('#profileheader',
      'My Profile')
      .click('button')
      .clearValue('Input[name=username]')
      .setValue('Input[name=username]', 'Ekhorowa')
      .clearValue('Input[name=username]')
      .setValue('Input[name=fullNames]', 'Omokaro Faith')
      .click('#updateprofilebutton')
      .assert.containsText('#fullNames',
      'Omokaro Faith')
      .assert.containsText('#username',
      'Ekhorowa')
      .end();
  },
};

