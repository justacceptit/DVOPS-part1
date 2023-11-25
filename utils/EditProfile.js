const { readJSON, writeJSON } = require('./EmployeeUtil')
const { Employee } = require('../models/Employee')
const fs =require('fs').promises;

async function editProfile(req,res){
    try{
    const id=req.body.id;
    const name = req.body.name;
    const password =req.body.password;
    const level =req.body.level;
    const time_in=req.body.time_in;
    const date=req.body.date;
    
    const allProfile =await readJSON('utils/employee.json');
    var modified =false;
    for(var i=0;i<allProfile.length;i++){
        var curcurrProfile =allProfile[i];
        if(curcurrProfile.id==id){
            
            allProfile[i].name=name;
            allProfile[i].password=password;
            allProfile[i].level=level;
            allProfile[i].time_in=time_in;
            allProfile[i].date=date;
            modified=true;

        }
    }
    if(modified==true){//if modified ==true
        await fs.writeFile('utils/employee.json',JSON.stringify(allProfile),'utf-8');
        return res.status(201).json({message:'Profile modified successfully'});
        
    }else{
        return res.status(500).json({message:'Error occured,Unable to edit'});
    }
   
}catch(error){
return res.status(500).json({message: error.message});
}
}
module.exports={
    editProfile
};