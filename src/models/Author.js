const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
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
    posts: {
        type: [Schema.Types.ObjectId],
        refer: 'posts'
    },
    is_active:{
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
});

AuthorSchema.pre('save', function(next){
    const author = this;
    const SALT_FACTOR = 10; // Número de veces que se va encriptar
    if(!author.isModified('password')) { return next(); }
    bcrypt.genSalt(SALT_FACTOR, function(err, salt){ 
        if(err) return next(err);
        bcrypt.hash(author.password, salt, function(error, hash){
            if(error) return next(error);
            author.password = hash;
            next();
        });
    });
});
module.exports = mongoose.model('author', AuthorSchema);