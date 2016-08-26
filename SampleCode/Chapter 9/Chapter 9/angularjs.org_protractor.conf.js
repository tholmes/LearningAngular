// An example configuration file.
exports.config = {
  //seleniumAddress: 'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  sauceUser: 'SAUCE USERNAME HERE',
  sauceKey: 'SAUCE API KEY HERE',

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['angularjs.org_protractor.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
