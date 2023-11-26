/*const { readJSON, writeJSON } = require('./EmployeeUtil')
const { Employee } = require('../models/Employee');
const { time } = require('console');
const fs =require('fs').promises;
async function TimeIn(req,res){
    try{
    
    const name = req.body.name;
    //const time_in=req.body.time_in;
    const date = req.body.date;
    
    const allProfile =await readJSON('utils/employee.json');
    var timedIn =false;
    var todaydate=new Date().toLocaleDateString();//to check with a new day
    for(var i=0;i<allProfile.length;i++){//for loop to for everything
        var curcurrProfile =allProfile[i];
    
        if(curcurrProfile.name==name){  //if found name
        if(curcurrProfile.date ==todaydate){//if already timed in today
         
            timedIn=true;
            return res.status(201).json({message:'Timed in Already'});
    }
             if(curcurrProfile.name ==name){//if found name
                if(curcurrProfile.date !=todaydate) //and is not todays date     
                allProfile[i].time_in=new Date().toLocaleTimeString();//assuming that endofday has already written the old info into its database, we can change it
                allProfile[i].date=new Date().toLocaleDateString();
                await fs.writeFile('utils/employee.json',JSON.stringify(allProfile),'utf-8');//write new info employee json   
                return res.status(201).json({message:'Employee has timed in successfully'});
        } 
       
      }}
   
}catch(error){
return res.status(500).json({message: error.message});
}
}
module.exports={
    TimeIn
};*/