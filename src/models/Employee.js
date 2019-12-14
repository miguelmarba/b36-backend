const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String
    },
    birth_date:{
        type: Date
    },
    gender:{
        type: String,
        enum: ['M', 'F', 'O']
    },
    contacts: {
        type: [Schema.Types.ObjectId],
        refer: 'contacts'
    },
    is_active:{
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
});

EmployeeSchema.pre('save', function(next){
    const employee = this;
    const SALT_FACTOR = 10; // Número de veces que se va encriptar
    if(!employee.isModified('password')) { return next(); }
    bcrypt.genSalt(SALT_FACTOR, function(err, salt){ 
        if(err) return next(err);
        bcrypt.hash(employee.password, salt, function(error, hash){
            if(error) return next(error);
            employee.password = hash;
            next();
        });
    });
});
module.exports = mongoose.model('employees', EmployeeSchema);