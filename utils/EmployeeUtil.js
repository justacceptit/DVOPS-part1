const { Employee } = require('../models/Employee');
const fs = require('fs').promises;


async function addProfile(req,res){
    try {
    const name=req.body.name;
    const password=req.body.password;
    const level=req.body.level;
    const month=req.body.month;
    const date=req.body.date;
    const time_in=req.body.time_in;
    if(name.length = 0 ){
        return res.status(500).json({message:'Please include a name.'});
    }else if(level=='0'){
        return res.status(500).json({message:'level not indicated'});
    }else if(password.length=0){
        return res.status(500).json({message:'Please include a password'});

    }else{
        const newEmployee =new Employee(name,password,level,date,time_in);
        const updatedEmployee =await writeJSON(newEmployee,'utils/employee.json')
        return res.status(201).json(updatedEmployee);
    }}
    catch (error){
        return res.status(500).json({message:error.message});
    }
    
    
};
async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) { console.error(err); throw err; }
}

async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        allObjects.push(object);

        await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
        return allObjects;
    } catch (err) { console.error(err); throw err; }
}
module.exports={
    readJSON,writeJSON,addProfile
};
