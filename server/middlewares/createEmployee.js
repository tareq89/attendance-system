const DB = require('../utility/connectDB');

const createEmployee = (user, callback) => {
    let employee = {
        name: user.name,
        email: user.email,
        salary: user.salary,
        role: user.role
    };

    const collection = DB.get().collection('users');
    collection.insertOne(employee, callback);
}    

module.exports = createEmployee;