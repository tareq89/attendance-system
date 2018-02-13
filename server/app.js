const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const config = require('./config');
const HRroutes = require('./routes/HRroutes');
const ManagerRoutes = require('./routes/ManagerRoutes');
const NoticeRoutes = require('./routes/NoticeRoutes');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/hr', HRroutes);
app.use('/manager', ManagerRoutes);
app.use('/notice', NoticeRoutes);

const DB = require('./utility/connectDB');



app.get('/', (req, res) => {
    const collection = DB.get().collection('users')
    collection.find({}).toArray((err, items) => {
        if(err) throw err;
        else {
            for(let item of items) {
                delete item.password
                delete item._id
            };
            console.log(items)
            res.send(items)
        }
    });        
});

app.post('/login', (req, res) => {
    const collection = DB.get().collection('users');
    collection.findOne({
        email: req.body.email        
    }, (err, user) => {        
        if (err) throw err;
        if (!user) {            
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user.password != req.body.password) {                       
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });            
        } else {
            console.log("user match")
            delete user.password;
            var token = jsonwebtoken.sign(user, config.SECRET);
            res.json({
                success: true,
                token: token,
                user: user
            });
        }
    })
});




DB.connect(config.DB_CONNECTION_STRING, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(config.PORT, function() {
      console.log(`Listening on port ${config.PORT}...`)
    })
  }
});