
class User {
    constructor(name, password) {
        this.name = name;
        this.password = password;
        this.time_in="";

        this.level= 1;
        this.date=new Date().toLocaleDateString();






    }
}

module.exports = { User };
