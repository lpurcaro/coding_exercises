class Animal {
    sound;

    constructor (sound = '') {
        this.sound = sound;
    }

    speak (phrase = '') {
        return `${phrase.split(' ').join(` ${this.sound} `)} ${phrase && this.sound}`;
    }
}

module.exports = Animal;