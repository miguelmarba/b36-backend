const { createEmployee, updateEmployee, deleteEmployee} = require('../../services/EmployeeService');
const authenticate = require('../../utils/authenticate')

const createNewEmployee = async (_, { data }) => {
    const employee = await createEmployee(data);
    return employee;
};

const updateOneEmployee = async (_, {id, data}) => {
    const employee = await updateEmployee(id, data);
    if (!employee) throw new Error ('Employee not exists');
    return employee;
};

const deleteOneEmployee = async (_, { id }) => {
    const employee = await deleteEmployee(id);
    if (!employee) throw new Error ('Employee not exists');
    return 'Employee has been deleted';
};

const login = async (_, params) => {
    const token = await authenticate(params).catch(e => {throw e;});
    return {
        token: token,
        message: 'Login Successful'
    };
};

module.exports = {
    createNewEmployee,
    updateOneEmployee,
    deleteOneEmployee,
    login
}