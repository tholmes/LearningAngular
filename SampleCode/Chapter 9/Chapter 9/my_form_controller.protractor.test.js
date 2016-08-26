describe('MyForm', function() {
    var ptor;

    beforeEach(function() {
        browser.get('http://localhost:8081/my_form.protractor.html');
        ptor = protractor.getInstance();
    });

    it('should submit successfully', function() {
        element(by.model('userData.name')).sendKeys('Victor Hugo');
        element(by.model('userData.email')).sendKeys('les@miserabl.es');

        element(by.css('input[type=submit]')).click();

        expect(element(by.css('#saved')).
            getCssValue('display')).
                toBe('block');
        expect(element(by.css('#saving')).
            getCssValue('display')).
                toBe('none');
        expect(element(by.css('#errors')).
            getCssValue('display')).
                toBe('none');
    });

    it('should show errors properly', function() {
        element(by.css('input[type=submit]')).click();

        expect(element(by.css('#saved')).
            getCssValue('display')).
                toBe('none');
        expect(element(by.css('#saving')).
            getCssValue('display')).
                toBe('none');
        expect(element(by.css('#errors')).
            getCssValue('display')).
                toBe('block');

        expect(element.all(by.css('.error-message')).
            count()).toBe(2);
        expect(element(by.css('.error-message:nth-of-type(1)')).
            getText()).
                toContain('Name required');
        expect(element(by.css('.error-message:nth-of-type(2)')).
            getText()).
                toContain('Email required');
    });

    it('should handle server errors', function() {
        var response =
            '%7B%20"error"%3A%20\"Internal%20Server%20Error"%20%7D';
        var url = 'http://localhost:8081/my_form.protractor.html?' +
            'code=500&' +
            'response=' + response;
        browser.get(url);

        element(by.model('userData.name')).sendKeys('Victor Hugo');
        element(by.model('userData.email')).sendKeys('les@miserabl.es');

        element(by.css('input[type=submit]')).click();

        expect(element(by.css('#saved')).
            getCssValue('display')).
                toBe('none');
        expect(element(by.css('#server-error')).
            getCssValue('display')).
                toBe('block');
        expect(element(by.css('#server-error')).
            getText()).
                toContain('Server Error: Internal Server Error');
    });
});
