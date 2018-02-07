const checkJWT = (req, res, next) => {    
    var token = req.body.token || req.query.token || req.headers['token'];
    if (token) {
  
      
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
      
          req.decoded = decoded;    
          next();
        }
      });
  
    } else {
  
      
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
  
    }
};

module.exports = checkJWT;