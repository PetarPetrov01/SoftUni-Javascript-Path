class Cube {
    constructor({ name, description, imageUrl, difficultyLevel }) {
        this.id = '5c3' + ('abcdefg'
            + (Math.ceil(Math.random() * 999999999999999)).toString(16)
            + (Math.ceil(Math.random() * 999999999999999)).toString(16))
            .slice(-21);
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.difficultyLevel = Number(difficultyLevel);
    }
}

module.exports = Cube;