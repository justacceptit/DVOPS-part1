const { readJSON, writeJSON } = require('./UserUtil')
const { User } = require('../models/User')
const fs =require('fs').promises;
async function getProfile(req,res){
    try{
        const allProfile = await readJSON('utils/users.json');
        return res.status(201).json({allProfile});
    }catch(error)
{
    return res.status(500).json({message: 'Showing all'});
}}
module.exports={
    getProfile
};