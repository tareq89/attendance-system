const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


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