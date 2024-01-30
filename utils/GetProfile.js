const { readJSON } = require('./UserUtil')

async function getProfile(req, res) {
    // const time_in = req.body.time_in;

    return readJSON('utils/users.json')
        .then(allProfile => {
            return res.status(201).json(allProfile);
        })
        .catch(error => {
            return res.status(500).json({ message: error.message });
        });
}/*
async function getProfileby(req,res){
    try{
        const id=req.params.id;
        const allProfile = await readJSON('utils/users.json');
        for(var i=0;i<allProfile.length;i++){
            var curcurrProfile =allProfile[i];
            if(curcurrProfile.id==id){
                
                return res.status(201).json(curcurrProfile);
            }
        }
        
    }catch(error)
{
    return res.status(500).json({message: "error.message"});
}}*/
module.exports={
    getProfile,/*getProfileby*/
};