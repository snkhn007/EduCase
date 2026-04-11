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

exports.delAll = (req, res)=>{
    Schools.delete().then(()=>{
        res.sen("Deleted All");
        console.log("Deleted All");
    }).catch((err)=>{
        res.send("Error Deleting all");
    });
}

exports.getSchools = (req, res) => {
    const lat = parseFloat(req.query.latitude);
    const long = parseFloat(req.query.longitude);

    if (isNaN(lat) || isNaN(long)) {
        return res.status(400).json({
            message: 'Valid latitude and longitude are required'
        });
    }

    Schools.fetchAll()
        .then(([rows, fields]) => {
            const schoolsWithDistance = [];

            for (let i = 0; i < rows.length; i++) {
                const dist = calculateDistance(
                    lat,
                    long,
                    parseFloat(rows[i].latitude),
                    parseFloat(rows[i].longitude)
                );

                schoolsWithDistance.push({
                    ...rows[i],
                    distance: dist
                });
            }

            schoolsWithDistance.sort((a, b) => a.distance - b.distance);

            res.status(200).json(schoolsWithDistance);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        });
};

function toRadians(degree) {
  return degree * (Math.PI / 180);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // in kilometers

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}