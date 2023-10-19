const Animal = require('./Animal');

class Tiger extends Animal {
    constructor (sound = 'grrr') {
        super(sound);
    }
}

module.exports = Tiger;

