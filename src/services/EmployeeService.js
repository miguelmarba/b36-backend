const { Employees } = require('../models');

const createEmployee = (data) => Employees.create( data );
const getAllEmployees = () => Employees.find({
    is_active:true
}).populate({
    path: 'employees',
    model: 'employees'
});
const getOneEmployee = (id) => Employees.findById({ 
    _id:id, is_active:true
}).populate({
    path: 'employees',
    model: 'employees'
});
const deleteEmployee = (id) => Employees.findByIdAndUpdate({
     _id:id, 
     is_active:true
    }, {
        is_active: false
});
const updateEmployee = (id, data) => Employees.findByIdAndUpdate({
    _id:id,
    is_active:true,
}, {
    ...data,
}, {
    new: true // Get updated row
});
const getEmployeeByEmail = (email) => Employees.findOne({email, is_active:true}).populate('employees');

module.exports = {
    createEmployee,
    getAllEmployees,
    getOneEmployee,
    deleteEmployee,
    updateEmployee,
    getEmployeeByEmail
};