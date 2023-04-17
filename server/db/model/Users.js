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
},{
    timestamps: true
});


userSchema.pre('save', async function(next) {
    //Encrypt "password" before saving it into the database
    try{
        const salt = process.env.JWT || await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch(err){
        console.log(err)
    }
}) ;

//User Authentication
userSchema.statics.authenticate = async function({email, password}) {
    const user = await User.findOne({email: email});
    if(!user){
        //Case User doesn't exist
        const error = new Error('Account Not Found');
        error.status = 404;
        throw error;
    } else if(user && (await bcrypt.compare(password, user.password))){
        //CASE Successful Login -> return token
        const token = jwt.sign({ email: user.email}, process.env.JWT_SECRET);
        return token;
    } else{
        //Case email/password typed wrong
        const error = new Error('Bad Credential');
        error.status = 401;
        throw error;
    }
};

//Authorization => sending user info back
userSchema.statics.findByToken = async function(token) {
    try{
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({email: email});
        if(user){
            return user;
        }
        throw 'Account Not Found'
    }
    catch(err){
        const error = new Error('bad credentials');
        error.status = 401;
        throw error;
    }
}

userSchema.methods.generateToken = function(){
    const token = jwt.sign({ email: this.email}, process.env.JWT_SECRET);
    return token;
}

const User = model('User', userSchema);

module.exports = User;