// function Cow() {
//     this.mowed = false;
//     this.moo = function moo() {
//         this.mowed = true; // mootable state: don't do that at home
//         return 'moo!';
//     };
// }
// casper.test.begin('Cow can moo', 2, function suite(test) {
//     var cow = new Cow();
//     test.assertEquals(cow.moo(), 'BAZINGA!');
//     test.assert(cow.mowed);
//     test.done();
// });

casper.test.begin('Google search retrieves 10 or more results', 5, function suite(test) {
    casper.start('http://www.baidu.com/', function() {
        test.assertTitle('Google', 'google homepage title is the one expected');
        test.assertExists('form[action="/search"]', 'main form is found');
        this.fill('form[action="/search"]', {
            q: 'casperjs'
        }, true);
    });

    casper.then(function() {
        test.assertTitle('casperjs - Recherche Google', 'google title is ok');
        test.assertUrlMatch(/q=casperjs/, 'search term has been submitted');
        test.assertEval(function() {
            return __utils__.findAll('h3.r').length >= 10;
        }, 'google search for "casperjs" retrieves 10 or more results');
    });

    casper.run(function() {
        test.done();
    });
});
