const express = require('express');
const router = express.Router();
const DB = require('../utility/connectDB');

router.get('/get', (req, res) => {

    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);

    const collection = DB.get().collection('notice');
    collection.find({}).skip(skip).limit(limit).toArray((err, notices) => {
        if(err) {
            res.sendStatus(400);
        }
        else {
            for(notice of notices) {
                delete notice._id;
            }
            res.json(notices);
        }
    });    
});


router.post('/post', (req, res) => {
    console.log(req.body);
    const collection = DB.get().collection('notice');
    collection.insertOne(req.body, (err, result) => {
        if (err) {
            console.log("Error")
            res.sendStatus(500);
        } else {
            console.log("Success")
            res.sendStatus(200);
        }        
    });
});


module.exports = router