const { readJSON, writeJSON } = require('./UserUtil')

const fs =require('fs').promises;

   

async function editProfile(req,res){
    try{
   // const id=req.params.id;
    const name = req.body.name;
    const password =req.body.password;
    const level =req.body.level;
    const time_in=req.body.time_in;
    const date=req.body.date;
    
    const allProfile =await readJSON('utils/users.json');
    var modified =false;
    for(var i=0;i<allProfile.length;i++){
        var curcurrProfile =allProfile[i];
        if(curcurrProfile.name==name){
            //allProfile[i].id=id;
            allProfile[i].name=name;
            allProfile[i].password=password;
            allProfile[i].level=level;
            allProfile[i].time_in=time_in;
            allProfile[i].date=date;
            modified=true;

        }
    }
    if(password.length<6){//if modified ==true
        modified==false
        return res.status(500).json({message:'Password legth too short'});
        
    }
     if(modified==true){//if modified ==true
        await fs.writeFile('utils/users.json',JSON.stringify(allProfile),'utf-8');
        return res.status(201).json({message:'Profile modified successfully!'});
        
    }
 
   
}catch(error){
return res.status(500).json({message:'Error occured,Unable to edit'});
}
}
module.exports={
    editProfile
    
};