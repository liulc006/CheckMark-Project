const mongoose = require('mongoose');
const User = require('./model/Users');
const Checklist = require('./model/Checklists');

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
        const [luca] = await Promise.all([
            User.create({
                firstName: "Luca",
                lastName: "Liu",
                email: "luca@gmail.com",
                password: "123"
            })
        ]);

        await Promise.all([
            Checklist.create({
                userId: luca._id,
                priorityLevel: 'high',
                tags: ['Grocery', 'Dinner'],
                status: 'close',
                description: 'Need to buy Scallion, Beef and Soy Sauce'
            }),
            Checklist.create({
                userId: luca._id,
                priorityLevel: 'medium',
                tags: ['Health'],
                status: 'open',
                description: 'Run across the bridge'
            }),            
            Checklist.create({
                userId: luca._id,
                priorityLevel: 'low',
                tags: ['Chores'],
                status: 'open',
                description: 'Wash the dishes'
            }),
        ]);
    }
    catch(err){
        console.log(err);
    }
}

module.exports = { conn, syncAndSeed, User};