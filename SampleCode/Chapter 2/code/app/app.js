'use strict';

angular.module('Workflow', [])

.controller('ToolsCtrl', function($scope) {
  $scope.tools = [
    'Bower',
    'Grunt',
    'Gulp',
    'Yeoman'
  ];
});
