var _ = require('lodash');
var pom = require('./interface.json');
var dynamicPom = require('./pom.js');
var config = require('./test.config.json');
_.assign(pom, dynamicPom);

describe('Protractor Demo App', function() {
    _.assign(pom, dynamicPom);

    beforeEach(function() {
        browser.get(config.page.URL);
    });

    xit('should have a title', function() {
        expect(browser.getTitle()).toEqual(config.page.title);
    });

    xit('should type firstname and secondname', function() {
        pom.enterFirstNameInput(config.people[0].firstName);
        pom.enterLastNameInput(config.people[0].lastName);
        expect(pom.getFirstNameInput()).toEqual(config.people[0].firstName);
        expect(pom.getLastNameInput()).toEqual(config.people[0].lastName);
    });

    xit('should be radiobutton selectable', function() {
        expect(pom.isMartialStatusSingleRadio()).toEqual(false);
        expect(pom.isMartialStatusMarriedRadio()).toEqual(false);
        expect(pom.isMartialStatusDivorcedRadio()).toEqual(false);

        pom.setMartialStatusSingleRadio();
        expect(pom.isMartialStatusSingleRadio()).toEqual(true);
        expect(pom.isMartialStatusMarriedRadio()).toEqual(false);
        expect(pom.isMartialStatusDivorcedRadio()).toEqual(false);

        pom.setMartialStatusMarriedRadio();
        expect(pom.isMartialStatusSingleRadio()).toEqual(false);
        expect(pom.isMartialStatusMarriedRadio()).toEqual(true);
        expect(pom.isMartialStatusDivorcedRadio()).toEqual(false);

        pom.setMartialStatusDivorcedRadio();
        expect(pom.isMartialStatusSingleRadio()).toEqual(false);
        expect(pom.isMartialStatusMarriedRadio()).toEqual(false);
        expect(pom.isMartialStatusDivorcedRadio()).toEqual(true);

        pom.setMartialStatusMarriedRadio();
        expect(pom.isMartialStatusSingleRadio()).toEqual(false);
        expect(pom.isMartialStatusMarriedRadio()).toEqual(true);
        expect(pom.isMartialStatusDivorcedRadio()).toEqual(false);

        pom.setMartialStatusSingleRadio();
        expect(pom.isMartialStatusSingleRadio()).toEqual(true);
        expect(pom.isMartialStatusMarriedRadio()).toEqual(false);
        expect(pom.isMartialStatusDivorcedRadio()).toEqual(false);
    });

    xit('should be checkbox checkable', function() {
        expect(pom.isHobbyDanceCheckbox()).toEqual(false);
        expect(pom.isHobbyReadingCheckbox()).toEqual(false);
        expect(pom.isHobbyCricketCheckbox()).toEqual(false);

        pom.setHobbyDanceCheckbox();
        expect(pom.isHobbyDanceCheckbox()).toEqual(true);
        expect(pom.isHobbyReadingCheckbox()).toEqual(false);
        expect(pom.isHobbyCricketCheckbox()).toEqual(false);

        pom.setHobbyReadingCheckbox();
        expect(pom.isHobbyDanceCheckbox()).toEqual(true);
        expect(pom.isHobbyReadingCheckbox()).toEqual(true);
        expect(pom.isHobbyCricketCheckbox()).toEqual(false);

        pom.setHobbyCricketCheckbox();
        expect(pom.isHobbyDanceCheckbox()).toEqual(true);
        expect(pom.isHobbyReadingCheckbox()).toEqual(true);
        expect(pom.isHobbyCricketCheckbox()).toEqual(true);

        pom.unsetHobbyCricketCheckbox();
        expect(pom.isHobbyDanceCheckbox()).toEqual(true);
        expect(pom.isHobbyReadingCheckbox()).toEqual(true);
        expect(pom.isHobbyCricketCheckbox()).toEqual(false);

        pom.unsetHobbyReadingCheckbox();
        expect(pom.isHobbyDanceCheckbox()).toEqual(true);
        expect(pom.isHobbyReadingCheckbox()).toEqual(false);
        expect(pom.isHobbyCricketCheckbox()).toEqual(false);

        pom.unsetHobbyDanceCheckbox();
        expect(pom.isHobbyDanceCheckbox()).toEqual(false);
        expect(pom.isHobbyReadingCheckbox()).toEqual(false);
        expect(pom.isHobbyCricketCheckbox()).toEqual(false);
    });

    it('should be select selectable', function() {
        expect(pom.getCountrySelect()).toEqual('Afghanistan');
        pom.clickCountrySelect();
        pom.selectCountrySelect('Algeria');
        expect(pom.getCountrySelect()).toEqual('Algeria');
    });

    xit('should be date of birthday choosable', function() {
        pom.selectDateOfBirthMonthSelect();
        pom.selectDateOfBirthDaySelect();
        pom.selectDateOfBirthYearSelect();
    });

    xit('should be phonenumber username and email typed', function() {
        // pom.enterEmailInput
        // pom.enterUsernameInput
        // pom.enter
    });
});