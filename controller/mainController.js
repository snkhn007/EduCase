exports.addSchool = (req, res)=>{
    res.send(`<form action="/addSchool" method="POST">
        <input type="text" name="name" id="name" placeholder="Enter Name:">
        <br>
        <input type="text" name="address" id="address" placeholder="Enter Address">
        <br>
        <input type="text" name="latitude" id="latitude" placeholder="Enter Latitude">
        <br>
        <input type="text" name="longitude" id="longitude" placeholder="Enter Longitude">
        <br>
        <button type="Submit">Submit</button>
    </form>`);
};

const {body, validationResult} = require('express-validator');
const Schools = require('../model/data');

exports.postAddSchool = (req, res)=>{
    console.log(req.body);

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }

    const {name, address, latitude, longitude} = req.body;
    const schoolObj = new Schools(name, address, latitude, longitude);

    schoolObj.save().then(()=>{
        return res.send('Saved sucessfully');
    }).catch((err)=>{
        console.log(err);
        return res.status(500).send("Error occures");
    })
}

exports.getSchools = (req, res)=>{
    // res.send('List of Schools');
    // const lat = req.body.latitude;
    // const long = req.bosy.longitude;
    Schools.fetchAll().then(([rows, fields])=>{
        // lat.isString().withMessage('Name must be a valid String');
        // long.isString().withMessage('Name must be a valid String');

        // for(let i=0; i<rows.size(); i++){
        //     const dist = 
        // }
        res.send(rows);
    }).catch((err)=>{
        res.send(err);
    })
    
}