const express = require('express');
const router = express.Router();
const checkJWT = require('../utility/checkJWT');

router.use(checkJWT);

router.get('/input', (req, res) => {
    res.send("Yes");
});


module.exports = router