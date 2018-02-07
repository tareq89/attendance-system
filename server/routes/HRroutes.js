const express = require('express');
const router = express.Router();
const checkJWT = require('../utility/checkJWT');
const createAttendance = require('../middlewares/createAttendance');

router.use(checkJWT);

router.post('/input', (req, res) => {
    console.log(req.decoded.role.indexOf('hr') > 0)
    if(req.decoded.role.indexOf('hr') > 0) {
        createAttendance(req.body, (err, result) => {
            if (err) res.sendStatus(500);
            else res.sendStatus(200);
        });
    } else {
        res.json({
            error: 'only hr can input attendance'
        });
    }
    
});


module.exports = router