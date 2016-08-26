function MyFormController($scope, $http) {
    $scope.userData = {};
    $scope.errorMessages = [];

    $scope.saveForm = function() {
        $scope.saving = true;
        $http.
            put('/api/submit', $scope.userData).
            success(function(data) {
                $scope.saving = false;
                $scope.success = true;
            }).
            error(function(err) {
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
                $scope.errorMessages.push(validationFunctions[i].message);
            }
        }

        return $scope.errorMessages;
    };
}

if (typeof module !== 'undefined') {
    module.exports = MyFormController;
}
