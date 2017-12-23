const library = (function () {
    const getRandom = (items) => {
        return items[Math.floor(Math.random() * items.length)];
    }

    const formatDateTimeMs = (timeMs) => {
        const date = new Date(timeMs);
        return `${date.toDateString()} ${date.toLocaleTimeString()}`;
    }

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }

    // Detailed
    const FACTS = {
        "Earth": [
            "The Earth is the densest planet in the Solar System.",
            "Earth is the only planet not named after a god.",
            "There is only one natural satellite of Earth.",
            "Earth has a powerful magnetic field. This phenomenon is caused by the nickel-iron core of the planet, coupled with its rapid rotation.        ",
            "Earth was formed approximately 4.54 billion years ago and is the only known planet to support life.",
        ],
        "Mercury": [
            "Mercury does not have any moons or rings.",
            "Mercury is the second densest planet.",
            "Mercury has a molten core.",
            "Mercury is only the second hottest planet.",
            "Mercury is named for the Roman messenger to the gods.",
            "Mercury is the most cratered planet in the Solar System. ",
            "Your weight on Mercury would be 38% of your weight on Earth.",
            "A day on the surface of Mercury lasts 176 Earth days.",
            "A year on Mercury takes 88 Earth days.",
            "Mercury has a diameter of 4,879 km, making it the smallest planet.",
            "It’s not known who discovered Mercury.",
            "Mercury is the smallest planet in the Solar System.",
        ],
        "Jupiter": [
            "Jupiter orbits the Sun once every 11.8 Earth years.",
            "The Great Red Spot is a huge storm on Jupiter.",
            "Jupiter's moon Ganymede is the largest moon in the solar system.",
            "Jupiter has the shortest day of all the planets.",
            "The ancient Babylonians were the first to record their sightings of Jupiter.",
            "Jupiter is the fourth brightest object in the solar system.",
        ],
        "Saturn": [

            "Saturn is the flattest planet.",
            "Saturn orbits the Sun once every 29.4 Earth years.",
            "Saturn's upper atmosphere is divided into bands of clouds.",
            "Saturn has the most extensive rings in the solar system.",
            "Saturn has 150 moons and smaller moonlets.",
            "Saturn's moon Titan is a moon with complex and dense nitrogen-rich atmosphere.",
        ],
        "Venus": [
            "Venus does not have any moons or rings.",
            "Venus is nearly as big as the Earth with a diameter of 12,104 km.",
            "Venus is thought to be made up of a central iron core, rocky mantle and silicate crust.",
            "A day on the surface of Venus (solar day) would appear to take 117 Earth days.",
            "A year on Venus takes 225 Earth days.",
            "The surface temperature on Venus can reach 471 degrees Celsius.",
        ],
        "Uranus": [
            "Uranus hits the coldest temperatures of any planet.",
            "Uranus has two sets of very thin dark coloured rings.",
            "Uranus is often referred to as an “ice giant” planet.",
            "Uranus makes one trip around the Sun every 84 Earth years.",
            "Uranus turns on its axis once every 17 hours, 14 minutes.",
            "Uranus was officially discovered by Sir William Herschel in 1781.",
            "Uranus’ moons are named after characters created by William Shakespeare and Alexander Pope.",
            "Uranus has two sets of very thin dark coloured rings.",
        ],
        "Neptune": [
            "Neptune is the smallest of the ice giants.",
            "The atmosphere of Neptune is made of hydrogen and helium, with some methane.",
            "Neptune has 14 moons.",
            "Neptune was not known to the ancients. It is not visible to the naked eye and was first observed in 1846. ",
            "Neptune spins on its axis very rapidly. Its equatorial clouds take 18 hours to make one rotation.",
            "In 1989, the Voyager 2 spacecraft swept past the planet. It returned the first close-up images of the Neptune system. ",

        ],
        "Mars": [
            "Mars is home to the tallest mountain in the solar system.",
            "Mars has the largest dust storms in the solar system.",
            "On Mars the Sun appears about half the size as it does on Earth.",
            "Mars takes its name from the Roman god of war.",
        ],
        "The Sun": [
            "At its centre the Sun reaches temperatures of 15 million degrees Celsius.",
            "The Sun is all the colours mixed together, this appears white to our eyes.",
            "The Sun is mostly composed of hydrogen (70%) and Helium (28%).",
            "The Sun is a main-sequence G2V star (or Yellow Dwarf).",
            "The Sun is 4.6 billion years old.",
            "The Sun is 109 times wider than the Earth and 330,000 times as massive.",
            "The Sun contains 99.86% of the mass in the Solar System. ",
            "Eventually, the Sun will consume the Earth. ",
            "Light from the Sun takes eight minutes to reach Earth. ",
            "The Sun travels at 220 kilometres per second. ",
            "One million Earths could fit inside the Sun.",
            "The temperature inside the Sun can reach 15 million degrees Celsius. ",
        ],
        "The Moon": [
            "The rise and fall of the tides on Earth is caused by the Moon.",
            "The Moon has no atmosphere.",
            "The first spacecraft to reach the Moon was Luna 1 in 1959.",
            "The Moon is the fifth largest natural satellite in the Solar System.",
            "During the 1950’s the USA considered detonating a nuclear bomb on the Moon.",
            "The Moon will be visited by man in the near future.",
            "The Moon has only been walked on by 12 people; all American males.",
            "The Moon was formed 4.6 billion years ago around some 30–50 million years after the formation of the solar system. "
        ]
    };

    const OBJECTS = new Set(Object.keys(FACTS));

    const REGEX = new RegExp(`/${OBJECTS.join("|")}/i`); // match only first occurrence

    function isSupportedFactObject(item) {
        return OBJECTS.has(item.toTitleCase());
    }

    function getRandomFact() {
        const objectFacts = FACTS[getRandom(OBJECTS)];
        return getRandom(objectFacts);
    }

    function getFirstMatch(fact) {
        const matched = fact.match(REGEX);
        return matched;
    }

    function replaceMatch(fact, matched) {
        let newObject = matched;
        while (matched === newObject) {
            newObject = getRandom(planets);
        }
        const res = fact.replace(matched, newObject);
        console.log('replaceMatch', 'old', fact, 'new', res);
        return res;
    }

    return {
        capitalize: capitalize,
        getRandom: getRandom,
        getFirstMatch: getFirstMatch,
        replaceMatch: replaceMatch,
        isSupportedFactObject: isSupportedFactObject,
        getRandomFact: getRandomFact,
        formatDateTimeMs: formatDateTimeMs,
        FACTS: FACTS,
        planets: planets
    }

})();
module.exports = library;

