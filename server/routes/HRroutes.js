const express = require('express');
const router = express.Router();
const checkJWT = require('../utility/checkJWT');
const createAttendance = require('../middlewares/createAttendance');

router.use(checkJWT);

router.post('/input', (req, res) => {
    createAttendance(req.body, (err, result) => {
        if (err) res.sendStatus(500);
        else res.sendStatus(200);
    });
});


module.exports = router