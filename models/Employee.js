class Employee {
    constructor(name, password,level) {
    this.name = name;
    this.password = password;
    this.level=level;
    this.time_in=new Date().toLocaleTimeString()//as a precaution if the person is working immediately
    this.date=new Date().toLocaleDateString();
    
    const timestamp =new Date().getTime();
    const random =Math.floor(Math.random()*1000);
    this.id =  "" + random.toString().padStart(3, '0');
}
    }
    module.exports = { Employee };