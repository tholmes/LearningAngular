angular.
  module('foo.shared.filters', []).
  filter('fooFilter', function(input) {
    return 'Hello ' + input;
  });
