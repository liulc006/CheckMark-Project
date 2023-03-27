const mongoose = require('mongoose');
const User = require('./model/Users');

const dB = process.env.DATABASE_URL || 'mongodb://localhost:27017/checkmark-app';

const conn = mongoose.connect(dB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));

const syncAndSeed= async () => {
    try{
        await mongoose.connection.dropDatabase();
        await Promise.all([
            User.create({
                firstName: "Luca",
                lastName: "Liu",
                email: "luca@gmail.com",
                password: "123"
            })
        ]);
    }
    catch(err){
        console.log(err);
    }
}

module.exports = { conn, syncAndSeed};