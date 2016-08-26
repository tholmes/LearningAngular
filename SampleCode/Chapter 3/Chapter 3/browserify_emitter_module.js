var emitter = require('event-emitter');

if (typeof window !== 'undefined' && window.angular) {
  var myModule = angular.module('MyModule', []);
  myModule.controller('BrowserifyController',
    function($scope) {
      $scope.emitter = emitter();

      $scope.numPings = 0;
      $scope.emitter.on('ping', function() {
        ++$scope.numPings;
      });
    });
}
