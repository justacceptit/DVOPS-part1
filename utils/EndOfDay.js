const { readJSON, writeJSON } = require('./EmployeeUtil')
const { Employee } = require('../models/Employee');
const { time } = require('console');
const fs =require('fs').promises;
async function EndOfDay(req,res){
    try{
    
    const name = req.body.name;
    const time_in=req.body.time_in;
    const date = req.body.date;
    const id = req.body.id;
    const allProfile =await readJSON('utils/employee.json');
   
    var todaydate=new Date().toLocaleDateString();//to check with a new day
    for(var i=0;i<allProfile.length;i++){
        var curcurrProfile =allProfile[i];
        
            if(curcurrProfile.date==todaydate){//if date is same as current day, to send info of employees that worked that day, this function is designed to collect information of all before the clock hits midnight
              allProfile[i].id=id;//maintain the id 
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