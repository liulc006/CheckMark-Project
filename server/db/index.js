const mongoose = require('mongoose');

const dB = process.env.DATABASE_URL || 'mongodb://localhost:27017/checkmark-app';

const conn = mongoose.connect(dB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));

module.exports = conn;

