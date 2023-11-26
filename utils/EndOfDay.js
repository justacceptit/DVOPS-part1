<<<<<<< HEAD
const { readJSON, writeJSON } = require('./UserUtil')
=======
const { readJSON, writeJSON } = require('./EmployeeUtil')
const { Employee } = require('../models/Employee');
const { time } = require('console');
>>>>>>> e61c8e8d2efd4996d6e266d2bc664116e35fd788
const fs =require('fs').promises;
async function EndOfDay(req,res){
    try{
    
<<<<<<< HEAD

    const allProfile =await readJSON('utils/users.json');
=======
    const name = req.body.name;
    const time_in=req.body.time_in;
    const date = req.body.date;
    const id = req.body.id;
    const allProfile =await readJSON('utils/employee.json');
>>>>>>> e61c8e8d2efd4996d6e266d2bc664116e35fd788
   
    var todaydate=new Date().toLocaleDateString();//to check with a new day
    for(var i=0;i<allProfile.length;i++){
        var curcurrProfile =allProfile[i];
        
<<<<<<< HEAD
            if(curcurrProfile.date==todaydate){//if date is same as current day, to send info of users that worked that day, this function is designed to collect information of all before the clock hits midnight
              
=======
            if(curcurrProfile.date==todaydate){//if date is same as current day, to send info of employees that worked that day, this function is designed to collect information of all before the clock hits midnight
              allProfile[i].id=id;//maintain the id 
>>>>>>> e61c8e8d2efd4996d6e266d2bc664116e35fd788
                await fs.writeFile('utils/eod.json',JSON.stringify(allProfile),'utf-8');//writes current info into eod.json
                 return res.status(201).json({message:'End of day'});
            }
}}catch(error){
return res.status(500).json({message: error.message});
}
};


module.exports={
  EndOfDay
};