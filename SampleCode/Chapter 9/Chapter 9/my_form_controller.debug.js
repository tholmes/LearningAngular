function MyFormController($scope, $http, $window) {
    if ($window.query && $window.query.debug) {
        debug.enable('MyFormController');
    } else {
        debug.disable('MyFormController');
    }
    var d = debug('MyFormController');
    d('loaded');
    $scope.userData = {};
    $scope.errorMessages = [];

    $scope.saveForm = function() {
        $scope.saving = true;
        d('saving form...');
        $http.
            put('/api/submit', $scope.userData).
            success(function(data) {
                d('save form success');
                $scope.saving = false;
                $scope.success = true;
                setTimeout(function() {
                    d('save form $scope.$apply() done');
                }, 0);
            }).
            error(function(err) {
                d('save form failed: ' + err);
                $scope.saving = false;
                $scope.error = err;
            });
    };

    $scope.validateForm = function() {
        var validationFunctions = [
            {
                fn: function() {
                    return !!$scope.userData.name
                },
                message: 'Name required'
            },
            {
                fn: function() {
                    return !!$scope.userData.email
                },
                message: 'Email required'
            }
        ];

        $scope.errorMessages = [];
        for (var i = 0; i < validationFunctions.length; ++i) {
            if (!validationFunctions[i].fn()) {
                d('failed validator with message: ' +
                    validationFunctions[i].message);
                $scope.errorMessages.push(validationFunctions[i].message);
            }
        }

        return $scope.errorMessages;
    };
}

if (typeof module !== 'undefined') {
    module.exports = MyFormController;
}
