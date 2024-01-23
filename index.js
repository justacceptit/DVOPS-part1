var express = require('express');
var bodyParser = require("body-parser");
var app = express();

const PORT = process.env.PORT || 5050
var startPage = "edit.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));



const{editProfile}=require('./utils/EditProfile')
app.put('/edit-profile/:name',editProfile);
const { EndOfDay } = require('./utils/EndOfDay');
app.put('/eod',EndOfDay);
const { getProfile, getProfileby } = require('./utils/GetProfile');
app.get('/get-profile',getProfile);
app.get('/get-profile-by/:id',getProfileby);


const { deleteUser, register, login, updateUserTime, updateUserTimeOut } = require('./utils/UserUtil');



// Define routes
app.delete('/delete-user/:id', deleteUser);
app.post('/register', register);
app.post('/login', login);
app.put('/update-user-time/:id', updateUserTime);
app.put('/time-out/:id',updateUserTimeOut);


const { call } = require('./utils/temp');
app.get('/call/:name/:password',call);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
});

const server = app.listen(PORT, function () {
    console.log(`Demo project at: ${PORT}!`);
});

module.exports = { app, server };
