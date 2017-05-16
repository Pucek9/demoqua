var pom = require('./pom.js');
var config = require('./test.config.json');

describe('Protractor Demo App', function() {
    // var pom = new Pom();

    beforeEach(function() {
        browser.get(config.page.URL);
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual(config.page.title);
    });

    it('should type firstname and secondname', function() {
        // pom.firstNameInput.sendKeys(config.people[0].firstName);
        // pom.lastNameInput.sendKeys(config.people[0].lastName);
        // expect(pom.firstNameInput.getAttribute('value')).toEqual(config.people[0].firstName);
        pom.enterFirstNameInput(config.people[0].firstName);
        pom.enterLastNameInput(config.people[0].lastName);
        expect(pom.getFirstNameInput()).toEqual(config.people[0].firstName);
        expect(pom.getLastNameInput()).toEqual(config.people[0].lastName);
    });

});