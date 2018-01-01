const planets = require('./planets');

const res = planets.getRandom([1, 2, 3]);
console.log(res);



const assert = require("assert"); // node.js core module

describe('Space Brain', function () {

    describe('Replace', function () {

        it('', function () {
            planets.OBJECTS.map((object) => {
                console.log(`\n${object}:`);
                const item = planets.getRandomFactForObject(object);
                const correctObject = planets.getFirstMatch(item);
                const newItem = planets.replaceMatch(item, correctObject);
                
                assert.ok(item.indexOf(object) !== -1);
                // correctObject should have been removed.
                assert.ok(newItem.indexOf(correctObject) === -1);
            })
        });
    });



    describe('Title Case', function () {

        it('Two Word Cases', function () {
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

        it('One Word Case', function () {
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
});


// let item = planets.getRandomFactForObject('The Moon')
// const correctObject = planets.getFirstMatch(item);
// const newItem = planets.replaceMatch(item, correctObject);
// console.log(item)
// console.log(newItem)
