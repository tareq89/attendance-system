const DB = require('../utility/connectDB');

const seeAttendanceReport = (skip =0, limit = 20, callback) => {   
    console.log(skip, limit)
    const collection = DB.get().collection('attendance');
    collection.find({}).skip(skip).limit(limit).toArray((err, items) => {
        if(err) throw err;
        else {
            for(item of items) {
                delete item._id;
            }
            callback(null, items);
        }
    });
}

module.exports = seeAttendanceReport;