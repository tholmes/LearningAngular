describe('MyForm', function() {
    it('should submit successfully', function() {
        browser().navigateTo('/my_form.html');

        httpBackend(200, {});

        input('userData.name').enter('Victor Hugo');
        input('userData.email').enter('les@miserabl.es');
        element('input[type=submit]').click();

        expect(element('#saved').css('display')).not().toBe('none');
        expect(element('#saving').css('display')).toBe('none');
        expect(element('#errors').css('display')).toBe('none');
    });

    it('should show errors properly', function() {
        browser().navigateTo('/my_form.html');

        httpBackend(200, {});

        element('input[type=submit]').click();

        expect(element('#saved').css('display')).toBe('none');
        expect(element('#saving').css('display')).toBe('none');
        expect(element('#errors').css('display')).not().toBe('none');

        expect(repeater('.error-message').count()).toBe(2);
        expect(element('.error-message:nth-of-type(1)').html())
            .toContain('Name required');
        expect(element('.error-message:nth-of-type(2)').html())
            .toContain('Email required');
    });

    it('should handle server errors', function() {
        browser().navigateTo('/my_form.html');

        httpBackend(500, { error: 'Internal Server Error' });

        input('userData.name').enter('Victor Hugo');
        input('userData.email').enter('les@miserabl.es');
        element('input[type=submit]').click();

        expect(element('#saved').css('display')).toBe('none');
        expect(element('#server-error').css('display')).not().toBe('none');
        expect(element('#server-error').html())
            .toContain('Server Error: Internal Server Error');
    });
});

angular.scenario.dsl('httpBackend', function() {
  return function(code, response) {
    return this.addFutureAction('tweaking $httpBackend', function(window, document, done) {
      window.$httpBackend.when('PUT', '/api/submit').respond(code, response);
      done();
    });
  };
});