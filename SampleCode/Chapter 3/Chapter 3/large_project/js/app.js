angular.
  module(
    'foo',
    [
      'foo.shared',
      'foo.registration',
      'foo.dashboard'
    ]).
  config(function($rootScopeProvider) {
    // Configuration logic goes here
  });
