const planets = require('./planets');

const res = planets.getRandom([1, 2, 3]);
console.log(res);

const assert = require("assert"); // node.js core module

describe('Space Brain', function () {

    it('Replace', function () {
        planets.OBJECTS.map((object) => {
            console.log(`\n${object}:`);
            const item = planets.getRandomFactForObject(object);
            const correctObject = planets.getFirstMatch(item);

            console.log(item, correctObject);
            assert.ok(item.indexOf(correctObject) !== -1);

            const newItem = planets.replaceMatchWithRandomObject(item, correctObject);

            // correctObject should have been removed.
            console.log(newItem, correctObject);
            assert.ok(newItem.indexOf(correctObject) === -1);
        })
    });

    it('isSupportedFactObjectFalse', function () {
        assert.ok(!planets.isSupportedFactObject('The oon'));
    });

    it('isSupportedFactObjectTrue', function () {
        assert.ok(planets.isSupportedFactObject('The Moon'));
    });

    it('Two Word Title Cases', function () {
        const cases = [
            'the moon',
            'the Moon',
            'The Moon'
        ];

        for (var i in cases) {
            const c = cases[i];
            assert.equal(planets.toTitleCase(c), 'The Moon');
        }
    });

    it('One Word Title Case', function () {
        const cases = [
            'moon',
            'Moon'
        ];

        for (var i in cases) {
            const c = cases[i];
            assert.equal(planets.toTitleCase(c), 'Moon');
        }
    });
});


// let item = planets.getRandomFactForObject('The Moon')
// const correctObject = planets.getFirstMatch(item);
// const newItem = planets.replaceMatch(item, correctObject);
// console.log(item)
// console.log(newItem)
