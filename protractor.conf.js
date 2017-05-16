exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['e2e/*/*.spec.js'],
    baseURL: 'http://localhost:8080/',
    framework: 'jasmine2',
    onPrepare: function () {
        browser.ignoreSynchronization = true;
        browser.waitForAngularEnabled(false);

        // browser.driver.manage().window().setSize(1680, 1050);
        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: 'testresults',
            filePrefix: 'xmloutput'
        }));
    }
};
