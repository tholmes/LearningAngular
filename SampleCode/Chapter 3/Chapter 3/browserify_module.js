if (typeof window !== 'undefined' && window.angular) {
  var myModule = angular.module('MyModule', []);
  myModule.controller('BrowserifyController',
    require('./browserify_controller.js'));
}
