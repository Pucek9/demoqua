var _ = require('lodash');
var config = require('./test.config.json');

function byCss(value) {
    return element(by.css(value))
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function generatePom() {
    var pom = {};

    function setType(element) {
        function setName(valueName, keyName) {
            var cssElelement = byCss(valueName);
            pom[keyName + capitalizeFirstLetter(element.type)] = cssElelement;

            function setMethods(method) {
                var methods = {
                    "enter": cssElelement.sendKeys,
                    "get": cssElelement.getAttribute.bind(this,'value'),
                    "click": cssElelement.click
                };
                pom[method + capitalizeFirstLetter(keyName) + capitalizeFirstLetter(element.type)] = methods[method];
            }
            _.forEach(element.methods, setMethods);
        }
        _.forEach(element.selectors, setName);
    }
    _.forEach(config.page.elements, setType);
    return pom;
}

var pom = generatePom();

module.exports = pom;