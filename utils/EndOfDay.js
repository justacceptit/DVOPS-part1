const { readJSON, writeJSON } = require('./UserUtil')
const fs =require('fs').promises;
async function EndOfDay(req,res){
    try{
    

    const allProfile =await readJSON('utils/users.json');
   
    var todaydate=new Date().toLocaleDateString();//to check with a new day
    for(var i=0;i<allProfile.length;i++){
        var curcurrProfile =allProfile[i];
        
            if(curcurrProfile.date==todaydate){//if date is same as current day, to send info of users that worked that day, this function is designed to collect information of all before the clock hits midnight
              
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