const { animals: { Lion, Tiger } } = require('./classes/Zoo');
const { parseUrl } = require('./utilities/helpers');

const lion = new Lion();
const tiger = new Tiger();

console.log(lion.speak("I'm a lion"));
console.log(tiger.speak("Lions suck"));


const parsedUrl = parseUrl('/:version/api/:collection/:id', '/6/api/listings/3?sort=desc&limit=10');

console.log({ parsedUrl });
