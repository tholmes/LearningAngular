var chapter7Module = angular.module('chapter7Module', []);
      
chapter7Module.provider('$googleStock', function() {
  var endpoint = 'http://query.yahooapis.com/v1/public/yql';
  var query = encodeURIComponent('select * from yahoo.finance.quotes where symbol in (\'GOOG\')');
  var url = endpoint + '?' + 'q=' + query +
    '&format=json&diagnostics=true&env=http://datatables.org/alltables.env';

  this.setEndpoint = function(u) {
    url = u;
  };

  this.$get = function($http) {
    var service = {};
    service.get = function() {
      $http.jsonp(url + '&callback=JSON_CALLBACK').
        success(function(data) {
          if (data.query.count) {
            var quotes = data.query.count > 1 ?
              data.query.results.quote :
              [data.query.results.quote];
            service.quotes = quotes;
          }
        }).
        error(function(data) {
          console.log(data);
        });
    };

    service.get();
    return service;
  };
});

function MyController($scope, $googleStock) {
  $scope.price = $googleStock;
}
