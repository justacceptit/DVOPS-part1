const { readJSON, writeJSON } = require('./UserUtil')
const { User } = require('../models/User')

async function call(req,res){
   
try{
    const name = req.params.name;
    const password =req.params.password;
    //const level =req.body.level;
    const allProfile =await readJSON('utils/users.json');
    for(var i=0;i<allProfile.length;i++){
        var curcurrProfile =allProfile[i];
       if(curcurrProfile.name==name && curcurrProfile.password==password){
            const id=allProfile[i].id
            const level=allProfile[i].level
            //allProfile[i].level=level;
            return res.status(201).json(level+'/'+id);
        }
      
     
}
}catch(error){
    return res.status(500).json({message: error.message});
    }}

    module.exports={
        call
        
    };