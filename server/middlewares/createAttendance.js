const DB = require('../utility/connectDB');

const createAttendance = (attendance, callback) => {   
    console.log(attendance)
    let employeeAttendance = {        
        email: attendance.employeeEmail,
        type: attendance.type,
        date: Date.now() // you should be using ISODatetime format, but no time
    }

    const collection = DB.get().collection('attendance');
    collection.insertOne(employeeAttendance, callback);
}

module.exports = createAttendance;