describe('', function() {
    console.log('Top level describe');

    beforeEach(function() {
        console.log('Top level beforeEach');
    });

    afterEach(function() {
        console.log('Top level afterEach');
    });

    describe('', function() {
        // The first describe has 2 it() calls
        beforeEach(function() {
            console.log('2nd level beforeEach from first describe');
        });

        afterEach(function() {
            console.log('2nd level afterEach from first describe');
        });

        it('', function() {
            console.log('test1');
        });

        it('', function() {
            console.log('test2');
        });
    });

    describe('', function() {
        // 2nd describe has 1 it call
        beforeEach(function() {
            console.log('2nd level beforeEach from second describe');
        });

        afterEach(function() {
            console.log('2nd level afterEach from second describe');
        });

        it('', function() {
            console.log('test3');
        });
    });

    it('', function() {
        console.log('test4');
    });
});