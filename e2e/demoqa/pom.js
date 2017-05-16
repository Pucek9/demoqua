var _ = require('lodash');
var fs = require('fs');
var util = require('util');
var config = require('./test.config.json');
var interface = require('./interface.json');

function byCss(value) {
    return element(by.css(value))
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function generatePom() {
    var pom = {};//interface;

    function setType(element) {
        function setName(valueName, keyName) {
            var cssElelement = byCss(valueName);
            // pom[keyName + capitalizeFirstLetter(element.type)] = cssElelement;
            function setMethods(method) {
                var methods = {
                    "enter": cssElelement.sendKeys,
                    "get": cssElelement.getAttribute.bind(this, 'value'),
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

generateInterface(pom);
module.exports = pom;