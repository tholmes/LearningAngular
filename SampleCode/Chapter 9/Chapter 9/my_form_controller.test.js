if (typeof require !== 'undefined') {
  MyFormController = require('./my_form_controller.js');
  assert = require('assert');
}

describe('MyFormController', function() {
    describe('validateForm', function() {
        var $scope;
        beforeEach(function() {
            $scope = {};
            MyFormController($scope, null);
        });

        it('should succeed if user entered name and email', function() {
            $scope.userData.name = 'Victor Hugo';
            $scope.userData.email = 'les@miserabl.es';

            $scope.validateForm();
            assert.equal(0, $scope.errorMessages.length);
        });

        it('should fail with no email', function() {
            $scope.userData.name = 'Victor Hugo';
            $scope.userData.email = '';

            $scope.validateForm();
            assert.equal(1, $scope.errorMessages.length);
            assert.equal('Email required', $scope.errorMessages[0]);
        });
    });
});

describe('Tests that fail on different browsers', function() {
    describe('Safari 5 disallows non-UTC designators for ISO dates', function() {
        assert.ok(new Date('2007-04-05T14:30:00').toString() != 'Invalid Date');
    });

    describe('IE9 outputs weird date string format', function() {
        // IE9 outputs a date that looks like 'Thu Apr 5 14:30:00 UTC 2007'
        var d = new Date('2007-04-05T14:30:00').toString();
        assert.ok(d.indexOf('Thu Apr 05 2007') != -1);
    });
});
