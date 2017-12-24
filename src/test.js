const planets = require('./planets');

const res = planets.getRandom([1,2,3]);
console.log(res);

planets.OBJECTS.map((object) => {
    console.log(`\n${object}:`);
    const item = planets.getRandomFactForObject(object);
    console.log(item)
    const correctObject = planets.getFirstMatch(item);
    const newItem = planets.replaceMatch(item, correctObject);
    console.log(newItem);
})

// let item = planets.getRandomFactForObject('The Moon')
// const correctObject = planets.getFirstMatch(item);
// const newItem = planets.replaceMatch(item, correctObject);
// console.log(item)
// console.log(newItem)