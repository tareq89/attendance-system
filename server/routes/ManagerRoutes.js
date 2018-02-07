const express = require('express');
const router = express.Router();
const checkJWT = require('../utility/checkJWT');
const seeAttendanceReport = require('../middlewares/seeAttendanceReport');

router.use(checkJWT);

router.get('/attendance', (req, res) => {    
    if(req.decoded.role.indexOf('manager') > 0) {        
        const skip = parseInt(req.query.skip)
        const limit = parseInt(req.query.limit)
        seeAttendanceReport(skip, limit, (err, result) => {            
            if (err) res.sendStatus(500);
            else res.json(result);
        });
    } else {
        res.json({
            error: 'only manager can see attendance report'
        });
    }
    
});


module.exports = router