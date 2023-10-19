const Animal = require('./Animal');

class Lion extends Animal {
    constructor (sound = 'roar') {
        super(sound);
    }
}

module.exports = Lion;