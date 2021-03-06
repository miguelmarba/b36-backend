const bcrypt  = require('bcrypt');
const { getEmployeeByEmail } = require('../services/EmployeeService');
const createToken = require('./createToken')

const authenticate = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        getEmployeeByEmail(email).then( user => {
            if(!user) reject(new Error('Employee not exists'));
            bcrypt.compare(password, user.password, (err, isValid) => {
                if(err) reject(new Error('Error to compare'));
                isValid ? resolve(createToken(user))
                    : reject (new Error('Incorrect Password'));
            });
        });
    });
};

module.exports = authenticate;