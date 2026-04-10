const express = require('express');
const app = express();

const {body, validationResult} = require('express-validator');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const {addSchool, postAddSchool, getSchools, delAll} = require('./controller/mainController');
const {inputValidation} = require('./middlewares/schoolValidation');

app.get('/addSchool', addSchool);

// id (Primary Key)
// name (VARCHAR)
// address (VARCHAR)
// latitude (FLOAT)
// longitude (FLOAT)
app.post('/addSchool', inputValidation , postAddSchool);

app.get('/listSchools', getSchools);

// app.get('/kill', delAll);

app.listen(3000, ()=>{
    console.log("Started.....");
})