const { readJSON, writeJSON } = require('./EmployeeUtil')
const { Employee } = require('../models/Employee')
const fs =require('fs').promises;
async function getProfile(req,res){
    try{
        const allProfile = await readJSON('utils/employee.json');
        return res.status(201).json({allProfile});
    }catch(error)
{
    return res.status(500).json({message: 'ohhmahgaddd'});
}}
module.exports={
    getProfile
};