var _ = require('lodash');
var config = require('./test.config.json');

var pom = require('./interface.json');
var dynamicPom = require('./pom.js');
_.assign(pom, dynamicPom);

function waitForElem(elem, time) {
    var DEFAULT_TIME = 5000;
    time = time || DEFAULT_TIME;
    browser.wait(protractor.ExpectedConditions.presenceOf(elem), time, 'Element taking too long to appear in the DOM')
}

xdescribe('Checking all controlls', function () {

    beforeEach(function () {
        browser.get(config.page.URL);
    });

    it('should have a title', function () {
        expect(browser.getTitle()).toEqual(config.page.title);
    });

    it('should be radiobutton selectable', function () {

        pom.chooseMartialStatusRadio('single');
        expect(pom.getCheckedMartialStatusRadio()).toEqual('single');
        expect(pom.isCheckedMartialStatusRadio('single')).toEqual(true);
        expect(pom.isCheckedMartialStatusRadio('married')).toEqual(false);
        expect(pom.isCheckedMartialStatusRadio('divorced')).toEqual(false);

        pom.chooseMartialStatusRadio('married');
        expect(pom.getCheckedMartialStatusRadio()).toEqual('married');
        expect(pom.isCheckedMartialStatusRadio('single')).toEqual(false);
        expect(pom.isCheckedMartialStatusRadio('divorced')).toEqual(false);

        pom.chooseMartialStatusRadio('divorced');
        expect(pom.getCheckedMartialStatusRadio()).toEqual('divorced');
        expect(pom.isCheckedMartialStatusRadio('single')).toEqual(false);
        expect(pom.isCheckedMartialStatusRadio('married')).toEqual(false);

        pom.chooseMartialStatusRadio('married');
        expect(pom.getCheckedMartialStatusRadio()).toEqual('married');
        expect(pom.isCheckedMartialStatusRadio('single')).toEqual(false);
        expect(pom.isCheckedMartialStatusRadio('divorced')).toEqual(false);

        pom.chooseMartialStatusRadio('single');
        expect(pom.getCheckedMartialStatusRadio()).toEqual('single');
        expect(pom.isCheckedMartialStatusRadio('married')).toEqual(false);
        expect(pom.isCheckedMartialStatusRadio('divorced')).toEqual(false);
    });

    it('should be checkbox unchecked', function () {
        expect(pom.isHobbyDanceCheckbox()).toEqual(false);
        expect(pom.isHobbyReadingCheckbox()).toEqual(false);
        expect(pom.isHobbyCricketCheckbox()).toEqual(false);
    });

    it('should be checkbox checkable', function () {
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

    it('should be select default', function () {
        expect(pom.getCountrySelect()).toEqual('Afghanistan');
    });


    it('should be date of birthday default empty', function () {
        expect(pom.getDateOfBirthMonthSelect()).toEqual('');
        expect(pom.getDateOfBirthDaySelect()).toEqual('');
        expect(pom.getDateOfBirthYearSelect()).toEqual('');
    });


    it('should be radiobutton unselected', function () {
        var statuses = ['single', 'married', 'divorced'];
        _.forEach(statuses, function (status) {
            expect(pom.isCheckedMartialStatusRadio(status)).toEqual(false);
        });
    });

    _.forEach(config.people, function (person) {

        it('should type firstname and secondname', function () {
            pom.enterFirstNameInput(person.firstName);
            expect(pom.getFirstNameInput()).toEqual(person.firstName);
            pom.enterLastNameInput(person.lastName);
            expect(pom.getLastNameInput()).toEqual(person.lastName);
            pom.clearFirstNameInput();
            expect(pom.getFirstNameInput()).toEqual('');
            pom.clearLastNameInput();
            expect(pom.getLastNameInput()).toEqual('');
        });

        it('should be date of birthday choosable', function () {
            pom.selectDateOfBirthMonthSelect(person.dateOfBirth.month);
            pom.selectDateOfBirthDaySelect(person.dateOfBirth.day);
            pom.selectDateOfBirthYearSelect(person.dateOfBirth.year);

            expect(pom.getDateOfBirthMonthSelect()).toEqual(person.dateOfBirth.month);
            expect(pom.getDateOfBirthDaySelect()).toEqual(person.dateOfBirth.day);
            expect(pom.getDateOfBirthYearSelect()).toEqual(person.dateOfBirth.year);
        });

        it('should be photo loaded', function () {
            pom.enterPhotoInput(person.photo);
            expect(pom.getPhotoInput()).toEqual(person.photo);
        });

        it('should be select selectable', function () {
            pom.selectCountrySelect(person.country);
            expect(pom.getCountrySelect()).toEqual(person.country);
        });

        it('should be phonenumber, username, email, description and passwords typed', function () {
            pom.enterPhoneNumberInput(person.phoneNumber);
            pom.enterUsernameInput(person.username);
            pom.enterEmailInput(person.email);
            pom.enterDescriptionInput(person.description);
            pom.enterPasswordInput(person.password);
            pom.enterConfirmPasswordInput(person.password);

            expect(pom.getPhoneNumberInput()).toEqual(person.phoneNumber);
            expect(pom.getEmailInput()).toEqual(person.email);
            expect(pom.getUsernameInput()).toEqual(person.username);
            expect(pom.getDescriptionInput()).toEqual(person.description);
            expect(pom.getPasswordInput()).toEqual(person.password);
            expect(pom.getConfirmPasswordInput()).toEqual(person.password);
        });
    });

});

describe('Should login', function () {
    //
    // beforeAll(function () {
    //     browser.get(config.page.URL);
    // });

    var person = config.people[0];

    it('should type names', function () {
        browser.get(config.page.URL);
        pom.enterFirstNameInput(person.firstName);
        expect(pom.getFirstNameInput()).toEqual(person.firstName);

        pom.enterLastNameInput(person.lastName);
        expect(pom.getLastNameInput()).toEqual(person.lastName);
    });

    it('should set martial status', function () {
        pom.chooseMartialStatusRadio(person.martialStatus);
        expect(pom.getCheckedMartialStatusRadio()).toEqual(person.martialStatus);
    });

    it('should set hobbys', function () {
        if (_.includes(person.hobby, 'cricket')) {
            pom.setHobbyCricketCheckbox();
            expect(pom.isHobbyCricketCheckbox()).toEqual(true);
        }
        if (_.includes(person.hobby, 'dance')) {
            pom.setHobbyDanceCheckbox();
            expect(pom.isHobbyDanceCheckbox()).toEqual(true);
        }
        if (_.includes(person.hobby, 'reading')) {
            pom.setHobbyReadingCheckbox();
            expect(pom.isHobbyReadingCheckbox()).toEqual(true);
        }
    });

    it('should set country and birthdate', function () {
        expect(pom.getCountrySelect()).toEqual('Afghanistan');
        pom.selectCountrySelect(person.country);
        expect(pom.getCountrySelect()).toEqual(person.country);

        pom.selectDateOfBirthMonthSelect(person.dateOfBirth.month);
        pom.selectDateOfBirthDaySelect(person.dateOfBirth.day);
        pom.selectDateOfBirthYearSelect(person.dateOfBirth.year);

        expect(pom.getDateOfBirthMonthSelect()).toEqual(person.dateOfBirth.month);
        expect(pom.getDateOfBirthDaySelect()).toEqual(person.dateOfBirth.day);
        expect(pom.getDateOfBirthYearSelect()).toEqual(person.dateOfBirth.year);
    });

    it('should set rest of data', function () {
        pom.enterPhoneNumberInput(person.phoneNumber);
        pom.enterUsernameInput(person.username);
        pom.enterEmailInput(person.email);
        pom.enterPhotoInput(person.photo);
        pom.enterDescriptionInput(person.description);
        pom.enterPasswordInput(person.password);
        pom.enterConfirmPasswordInput(person.password);

        expect(pom.getPhoneNumberInput()).toEqual(person.phoneNumber);
        expect(pom.getEmailInput()).toEqual(person.email);
        expect(pom.getPhotoInput()).toEqual(person.photo);
        expect(pom.getUsernameInput()).toEqual(person.username);
        expect(pom.getDescriptionInput()).toEqual(person.description);
        expect(pom.getPasswordInput()).toEqual(person.password);
        expect(pom.getConfirmPasswordInput()).toEqual(person.password);
    });

    it('should click submit and see result', function () {
        pom.clickSubmitButton();

        browser.pause(10000);
        // waitForElem(pom.errorMessageLabel);
        expect(pom.getTextErrorMessageLabel()).toEqual('Error: Username already exists')
        browser.pause(10000);
        //expect(pom.getTextSuccessMessageLabel()).toEqual('Thank you for your registration');

    });

});