var express = require('express');
var bodyParser = require("body-parser");
var app = express();

const PORT = process.env.PORT || 5050
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));
<<<<<<< HEAD
const{addProfile}=require('./utils/EmployeeUtil')
app.post('/add-profile',addProfile);
const{editProfile}=require('./utils/EditProfile')
app.put('/edit-profile/:id',editProfile);
//const { TimeIn } = require('./utils/TimeIn');
//app.put('/time-in',TimeIn);
const { EndOfDay } = require('./utils/EndOfDay');
app.put('/eod',EndOfDay);
=======

const { register, login } = require('./utils/UserUtil')
app.post('/register', register);
app.post('/login', login);

>>>>>>> main
app.get('/', (req, res) => {
res.sendFile(__dirname + "/public/" + startPage);
})

app.listen(PORT, function () {
console.log(`Demo project at: ${PORT}!`); });