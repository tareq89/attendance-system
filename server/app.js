const express = require('express');
const app = express();
const db = require('./utility/connectDB');
const dbConnectionString = "mongodb://localhost:27017/";
let DB = {};

app.get('/', (req, res) => {
    const collection = db.get().collection('users')
    collection.find({}).toArray((err, items) => {
        if(err) throw err;
        console.log(items)
        res.send(items)
    });        
});


const PORT = process.env.PORT || 3000;
db.connect(dbConnectionString, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(PORT, function() {
      console.log(`Listening on port ${PORT}...`)
    })
  }
})