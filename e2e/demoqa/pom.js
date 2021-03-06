var _ = require('lodash');
var fs = require('fs');
var util = require('util');
var config = require('./test.config.json');

var mockObjectForInterfaceStandaloneGenerator = {
    getAttribute: function () {
    }
};

function byCss(value) {
    if (typeof element !== 'undefined') {
        return element(by.css(value));
    }
    else {
        return mockObjectForInterfaceStandaloneGenerator;
    }
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

            function selectOption (value) {
                cssElelement.click();
                cssElelement.element(by.css('option[value="' + value + '"]')).click();
            }

            function setRadio (value) {
                cssElelement.element(by.css('input[value="' + value + '"]')).click();
            }

            function getCheckedRadio () {
                var checked = cssElelement.element(by.css('input[type="radio"]:checked'));
                return checked.getAttribute('value');
            }

            function isCheckedRadio (value) {
                return cssElelement.element(by.css('input[type="radio"][value="'+value+'"]')).isSelected()
            }

            function setMethods(method) {
                var methods = {
                    "enter": cssElelement.sendKeys,
                    "clear": cssElelement.clear,
                    "get": cssElelement.getAttribute.bind(this, 'value'),
                    "getText": cssElelement.getAttribute.bind(this, 'textContent'),
                    "click": cssElelement.click,
                    "set": cssElelement.click,
                    "is": cssElelement.isSelected,
                    "unset": cssElelement.click,
                    "getChecked": getCheckedRadio,
                    "isChecked": isCheckedRadio,
                    "choose": setRadio,
                    "select": selectOption
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

function addQutes(value, key) {
    var row = {};
    var quotedValue = util.inspect(value), quotedKey = key.toString();
    row[quotedKey] = quotedValue;
    return row;
}

function createInterface(pom) {
    var pomInterface = _.transform(_.map(pom, addQutes), _.ary(_.extend, 2), {});
    return pomInterface;
}

function generateInterface(pom) {
    var pomInterface = createInterface(pom);
    fs.writeFileSync('./e2e/demoqa/interface.json', JSON.stringify(pomInterface), 'utf-8');
}

var pom = generatePom();
generateInterface(pom);
module.exports = pom;
//
// "martialStatusSingle": "input[type='radio'][value='single']",
//     "martialStatusMarried": "input[type='radio'][value='married']",
//     "martialStatusDivorced": "input[type='radio'][value='divorced']"