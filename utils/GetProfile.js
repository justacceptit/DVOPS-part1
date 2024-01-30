const { readJSON } = require('./UserUtil')

async function getProfile(req,res){
    try{
        //const time_in=req.body.time_in;
        const allProfile = await readJSON('utils/users.json');
        return res.status(201).json(allProfile);
    }catch(error)
{
    return res.status(500).json({message: error.message});
}}


module.exports={
    getProfile
};