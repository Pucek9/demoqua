var pom = require('./pom.js');
var config = require('./test.config.json');

describe('Protractor Demo App', function() {

    beforeEach(function() {
        browser.get(config.page.URL);
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual(config.page.title);
    });

    it('should type firstname and secondname', function() {
        pom.enterFirstNameInput(config.people[0].firstName);
        pom.enterLastNameInput(config.people[0].lastName);
        expect(pom.getFirstNameInput()).toEqual(config.people[0].firstName);
        expect(pom.getLastNameInput()).toEqual(config.people[0].lastName);
    });

});