describe('MyFormController', function() {
    describe('saveForm', function() {
        var $httpBackend, $rootScope, createController;

        beforeEach(inject(function($injector) {
            // Set up the mock http service responses
            $httpBackend = $injector.get('$httpBackend');

            // Get hold of a scope (i.e. the root scope)
            $rootScope = $injector.get('$rootScope');
            // The $controller service is used to create instances of controllers
            var $controller = $injector.get('$controller');

            createController = function() {
                return $controller('MyFormController', {
                    '$scope' : $rootScope
                });
            };
        }));

        it('should handle a successful server request', function() {
            createController();

            $httpBackend.when('PUT', '/api/submit').respond(200, {});

            $rootScope.saveForm();

            assert.ok($rootScope.saving);

            $httpBackend.flush();

            assert.ok(!$rootScope.saving);
            assert.ok($rootScope.success);
        });

        it('should handle server-side error', function() {
            createController();

            $httpBackend.when('PUT', '/api/submit').respond(
                500,
                { error: 'Oops' });

            $rootScope.saveForm();

            assert.ok($rootScope.saving);

            $httpBackend.flush();

            assert.ok(!$rootScope.saving);
            assert.ok(!$rootScope.success);
            assert.equal('Oops', $rootScope.error.error);
        });
    });
});