const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: String,
});


userSchema.pre('save', async function(next) {
    //Encrypt "password" before saving it into the database
    const salt = process.env.JWT || await bcrypt.genSalt();
    console.log(salt)
    console.log('pre save')
    next();
})

const User = model('User', userSchema);

module.exports = User;