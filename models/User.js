class User {
    constructor(name, password,level) {
    this.name = name;
    this.password = password;
    this.level=level;
    this.date=new Date().toLocaleDateString();
    this.time_in="";
    
    const timestamp =new Date().getTime();
    const random=Math.floor(Math.random()*1000);
    this.id=""+random.toString().padStart(3,'0');
    }
    }
    module.exports = { User };
