<<<<<<< HEAD
const { readJSON, writeJSON } = require('./EmployeeUtil')
const { Employee } = require('../models/Employee')
const fs =require('fs').promises;
async function DayIn(req,res){
    try{
    
    const name = req.body.name;
    const time_in=req.body.time_in;
    const date = req.body.date;
    
    const allProfile =await readJSON('utils/employee.json');
   
    var todaydate=new Date().toLocaleDateString();//to check with a new day
    for(var i=0;i<allProfile.length;i++){
        var curcurrProfile =allProfile[i];
        if(curcurrProfile.name==name){
            if(curcurrProfile.date!=todaydate){//first time

                await fs.writeFile('utils/time.json',JSON.stringify(allProfile),'utf-8');
                  allProfile[i].date=new Date().toLocaleDateString();
        allProfile[i].time_in=new Date().toLocaleTimeString;
                await fs.writeFile('utils/employee.json',JSON.stringify(allProfile),'utf-8');
        }
        if(curcurrProfile.date==todaydate){// if date = today 

              
            return res.status(201).json({message:'Time in today'});
   
}
        allProfile[i].date=new Date().toLocaleDateString();
        allProfile[i].time_in=new Date().toLocaleTimeString;
                await fs.writeFile('utils/time.json',JSON.stringify(allProfile),'utf-8');
                return res.status(201).json({message:'Time reset'});
       }
}}catch(error){
return res.status(500).json({message: error.message});
}
};
=======
/*const { readJSON, writeJSON } = require('./EmployeeUtil')
const { Employee } = require('../models/Employee');
const { time } = require('console');
const fs =require('fs').promises;
>>>>>>> main
async function TimeIn(req,res){
    try{
    
    const name = req.body.name;
<<<<<<< HEAD
    const time_in=req.body.time_in;
=======
    //const time_in=req.body.time_in;
>>>>>>> main
    const date = req.body.date;
    
    const allProfile =await readJSON('utils/employee.json');
    var timedIn =false;
    var todaydate=new Date().toLocaleDateString();//to check with a new day
<<<<<<< HEAD
    for(var i=0;i<allProfile.length;i++){
        var curcurrProfile =allProfile[i];
    
        if(curcurrProfile.name==name){
        
        }  
       /* else if(curcurrProfile.date ==todaydate){
            await fs.writeFile('utils/time.json',JSON.stringify(allProfile),'utf-8');
           
           { allProfile[i].date=new Date().toLocaleTimeString();
            allProfile[i].time_in='';
       
            await fs.writeFile('utils/employee.json',JSON.stringify(allProfile),'utf-8');}
        
    }*/
             if(curcurrProfile.time_in ==''){
                if(curcurrProfile.date !=todaydate)
             
                //timedIn =false;
                allProfile[i].time_in=new Date().toLocaleTimeString();
                allProfile[i].date=todaydate;
         
           
                return res.status(201).json({message:'Employee has timed in successfully'});
        } 
       // else if(curcurrProfile.time_in !=''){
         //   if(curcurrProfile.date ==todaydate)
           // timedIn =false;
           // return res.status(201).json({message:'Employee has timed in successfully'});
        //}
        
      //  else{
        //    allProfile[i].time_in=new Date().toLocaleTimeString();
          //  timedIn=true;

        //}
    }
    if(timedIn==true){//if modified ==true
        await fs.writeFile('utils/employee.json',JSON.stringify(allProfile),'utf-8');
        return res.status(201).json({message:'Timed in successfully'});
        
    }else{
        return res.status(500).json({message:'Employee has timed in successfully'});
    }
=======
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
>>>>>>> main
   
}catch(error){
return res.status(500).json({message: error.message});
}
}
module.exports={
<<<<<<< HEAD
    TimeIn,DayIn
};
=======
    TimeIn
};*/
>>>>>>> main
