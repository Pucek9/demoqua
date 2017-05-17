var _ = require('lodash');
var pom = require('./interface.json');
var dynamicPom = require('./pom.js');
var config = require('./test.config.json');
_.assign(pom, dynamicPom);

describe('Checking all controlls', function() {

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

    it('should be radiobutton selectable', function() {

        pom.chooseMartialStatusRadio('single');
        expect(pom.checkMartialStatusRadio()).toEqual('single');

        pom.chooseMartialStatusRadio('married');
        expect(pom.checkMartialStatusRadio()).toEqual('married');

        pom.chooseMartialStatusRadio('divorced');
        expect(pom.checkMartialStatusRadio()).toEqual('divorced');

        // expect(pom.isMartialStatusSingleRadio()).toEqual(false);
        // expect(pom.isMartialStatusMarriedRadio()).toEqual(false);
        // expect(pom.isMartialStatusDivorcedRadio()).toEqual(false);
        //
        // pom.setMartialStatusSingleRadio();
        // expect(pom.isMartialStatusSingleRadio()).toEqual(true);
        // expect(pom.isMartialStatusMarriedRadio()).toEqual(false);
        // expect(pom.isMartialStatusDivorcedRadio()).toEqual(false);
        //
        // pom.setMartialStatusMarriedRadio();
        // expect(pom.isMartialStatusSingleRadio()).toEqual(false);
        // expect(pom.isMartialStatusMarriedRadio()).toEqual(true);
        // expect(pom.isMartialStatusDivorcedRadio()).toEqual(false);
        //
        // pom.setMartialStatusDivorcedRadio();
        // expect(pom.isMartialStatusSingleRadio()).toEqual(false);
        // expect(pom.isMartialStatusMarriedRadio()).toEqual(false);
        // expect(pom.isMartialStatusDivorcedRadio()).toEqual(true);
        //
        // pom.setMartialStatusMarriedRadio();
        // expect(pom.isMartialStatusSingleRadio()).toEqual(false);
        // expect(pom.isMartialStatusMarriedRadio()).toEqual(true);
        // expect(pom.isMartialStatusDivorcedRadio()).toEqual(false);
        //
        // pom.setMartialStatusSingleRadio();
        // expect(pom.isMartialStatusSingleRadio()).toEqual(true);
        // expect(pom.isMartialStatusMarriedRadio()).toEqual(false);
        // expect(pom.isMartialStatusDivorcedRadio()).toEqual(false);
    });

    it('should be checkbox checkable', function() {
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
        pom.selectCountrySelect(config.people[0].country);
        expect(pom.getCountrySelect()).toEqual(config.people[0].country);
    });

    it('should be date of birthday choosable', function() {
        expect(pom.getDateOfBirthMonthSelect()).toEqual('');
        expect(pom.getDateOfBirthDaySelect()).toEqual('');
        expect(pom.getDateOfBirthYearSelect()).toEqual('');

        pom.selectDateOfBirthMonthSelect(config.people[0].dateOfBirth.month);
        pom.selectDateOfBirthDaySelect(config.people[0].dateOfBirth.day);
        pom.selectDateOfBirthYearSelect(config.people[0].dateOfBirth.year);

        expect(pom.getDateOfBirthMonthSelect()).toEqual(config.people[0].dateOfBirth.month);
        expect(pom.getDateOfBirthDaySelect()).toEqual(config.people[0].dateOfBirth.day);
        expect(pom.getDateOfBirthYearSelect()).toEqual(config.people[0].dateOfBirth.year);
    });

    it('should be photo loaded', function() {
        pom.enterPhotoInput(config.people[0].photo);
        expect(pom.getPhotoInput()).toEqual(config.people[0].photo);
    });

    it('should be phonenumber, username, email, description and passwords typed', function() {
        pom.enterPhoneNumberInput(config.people[0].phoneNumber);
        pom.enterUsernameInput(config.people[0].username);
        pom.enterEmailInput(config.people[0].email);
        pom.enterDescriptionInput(config.people[0].description);
        pom.enterPasswordInput(config.people[0].password);
        pom.enterConfirmPasswordInput(config.people[0].password);

        expect(pom.getPhoneNumberInput()).toEqual(config.people[0].phoneNumber);
        expect(pom.getEmailInput()).toEqual(config.people[0].email);
        expect(pom.getUsernameInput()).toEqual(config.people[0].username);
        expect(pom.getDescriptionInput()).toEqual(config.people[0].description);
        expect(pom.getPasswordInput()).toEqual(config.people[0].password);
        expect(pom.getConfirmPasswordInput()).toEqual(config.people[0].password);
    });
});

describe('Should login', function() {

    beforeEach(function() {
    });

    it('should type names', function() {
        browser.get(config.page.URL);

        pom.enterFirstNameInput(config.people[0].firstName);
        pom.enterLastNameInput(config.people[0].lastName);
        expect(pom.getFirstNameInput()).toEqual(config.people[0].firstName);
        expect(pom.getLastNameInput()).toEqual(config.people[0].lastName);

        pom.chooseMartialStatusRadio(config.people[0].martialStatus);
        switch(config.people[0].martialStatus) {
            case ('single'): {
                expect(pom.checkMartialStatusRadio()).toEqual('single');
                break;
            }
            case ('married'): {
                expect(pom.checkMartialStatusRadio()).toEqual('married');
                break;
            }
            case ('divorced'): {
                expect(pom.checkMartialStatusRadio()).toEqual('divorced');
                break;
            }
            default: break;
        }


        if (_.includes(config.people[0].hobby, 'cricket')) {
            pom.setHobbyCricketCheckbox();
            expect(pom.isHobbyCricketCheckbox()).toEqual(true);
        }
        if (_.includes(config.people[0].hobby, 'dance')) {
            pom.setHobbyDanceCheckbox();
            expect(pom.isHobbyDanceCheckbox()).toEqual(true);
        }
        if (_.includes(config.people[0].hobby, 'reading')) {
            pom.setHobbyReadingCheckbox();
            expect(pom.isHobbyReadingCheckbox()).toEqual(true);
        }

        expect(pom.getCountrySelect()).toEqual('Afghanistan');
        pom.selectCountrySelect(config.people[0].country);
        expect(pom.getCountrySelect()).toEqual(config.people[0].country);

        pom.selectDateOfBirthMonthSelect(config.people[0].dateOfBirth.month);
        pom.selectDateOfBirthDaySelect(config.people[0].dateOfBirth.day);
        pom.selectDateOfBirthYearSelect(config.people[0].dateOfBirth.year);

        expect(pom.getDateOfBirthMonthSelect()).toEqual(config.people[0].dateOfBirth.month);
        expect(pom.getDateOfBirthDaySelect()).toEqual(config.people[0].dateOfBirth.day);
        expect(pom.getDateOfBirthYearSelect()).toEqual(config.people[0].dateOfBirth.year);

        pom.enterPhoneNumberInput(config.people[0].phoneNumber);
        pom.enterUsernameInput(config.people[0].username);
        pom.enterEmailInput(config.people[0].email);
        pom.enterPhotoInput(config.people[0].photo);
        pom.enterDescriptionInput(config.people[0].description);
        pom.enterPasswordInput(config.people[0].password);
        pom.enterConfirmPasswordInput(config.people[0].password);

        expect(pom.getPhoneNumberInput()).toEqual(config.people[0].phoneNumber);
        expect(pom.getEmailInput()).toEqual(config.people[0].email);
        expect(pom.getPhotoInput()).toEqual(config.people[0].photo);
        expect(pom.getUsernameInput()).toEqual(config.people[0].username);
        expect(pom.getDescriptionInput()).toEqual(config.people[0].description);
        expect(pom.getPasswordInput()).toEqual(config.people[0].password);
        expect(pom.getConfirmPasswordInput()).toEqual(config.people[0].password);

        pom.clickSubmitButton();
        // setTimeout(function() {
        //     expect(pom.getTextErrorMessageLabel()).toEqual('Error: Username already exists');
        // }, 500)
        // expect(pom.getTextSuccessMessageLabel()).toEqual('Thank you for your registration');


    });


});