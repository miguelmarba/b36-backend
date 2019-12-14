const { getAllEmployees, getOneEmployee } = require('../../services/EmployeeService');

const getEmployees = async () => {
    const employees = await getAllEmployees();
    return employees;
}

// const getSingleAuthor = async (root, params, context, info) => {}
const getSingleEmployee = async (_, {id}) => {
    const employee = await getOneEmployee(id);
    if(!employee){
        throw new Error ('Employee not exists');
    }
    return author;
}

const me = async (_, __, {user}) => {
    // const employee = await getOneEmployee(user._id);
    return user;
};

module.exports = {
    getEmployees,
    getSingleEmployee,
    //me,
}