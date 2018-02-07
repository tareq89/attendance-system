const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');

const HRroutes = require('./routes/HRroutes');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.set('superSecret', 'selise');
app.use('/hr', HRroutes);

const DB = require('./utility/connectDB');
const createEmployee = require('./middlewares/createEmployee');


app.get('/', (req, res) => {
    const collection = DB.get().collection('users')
    collection.find({}).toArray((err, items) => {
        if(err) throw err;
        console.log(items)
        res.send(items)
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
            var token = jsonwebtoken.sign(user, app.get('superSecret'));
            res.json({
                success: true,
                token: token
            });
        }
    })
});

app.post('/create', (req, res) => {
    console.log(createEmployee)
    createEmployee(req.body, (err, result) => {
        if (err) {
            console.log("Error")
            res.sendStatus(500);
        } else {
            console.log("Success")
            res.sendStatus(200);
        }        
    })
});




const DB_CONNECTION_STRING = "mongodb://localhost:27017/";
const PORT = process.env.PORT || 3000;

DB.connect(DB_CONNECTION_STRING, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(PORT, function() {
      console.log(`Listening on port ${PORT}...`)
    })
  }
})