import config from './config';

export default {
  'Logout A User': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body', 3000)
      .assert.containsText('#greetings',
      'Managing And Organizing Of Documents Just Got Better')
      .click('#login')
      .setValue('Input[name=identifier]', 'omokarofaith@gmail.com')
      .setValue('Input[name=password]', 'Ekhorowa')
      .click('button')
      .waitForElementVisible('#logoutuser', 3000)
      .assert.containsText('#title-header',
      'My Documents')
      .click('#logoutuser')
      .waitForElementVisible('body', 3000)
      .assert.containsText('#greetings',
      'Managing And Organizing Of Documents Just Got Better')
      .end(),
};
