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
}
module.exports={
    getProfile
};