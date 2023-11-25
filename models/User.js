class User {
    constructor(name, location, description, owner) {
        this.name = name;
        this.location = location;
        this.description = description;
        this.owner = owner;


        const random = Math.floor(Math.random() * 1000);
        this.id = timestamp + "" + random.toString().padStart(3, '0');
    }
}

module.exports = { User };