var express = require('express');
var bodyParser = require("body-parser");
var app = express();
const PORT = process.env.PORT || 5050
var startPage = "index.html";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));
const{addProfile}=require('./utils/EmployeeUtil')
app.post('/add-profile',addProfile);
const{getProfile}=require('./utils/GetProfile')
app.get('/get-profile',getProfile);
const{DayIn}=require('./utils/TimeIn')
app.post('/time-in',DayIn);
app.get('/', (req, res) => {
res.sendFile(__dirname + "/public/" + startPage);
})
app.listen(PORT, function () {
console.log(`Demo project at: ${PORT}!`); });