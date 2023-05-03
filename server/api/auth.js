const express = require('express');
const app = express.Router();
const { User } = require('../db');
const isLoggedIn = require('./middleware');

app.post('/', async(req, res, next)=>{
    //Attempt Logging request
    try{
        res.send(await User.authenticate(req.body));
    }
    catch(err){
        next(err);
    };
});

app.get('/', isLoggedIn, (req,res, next)=>{
    try{
        res.send(req.user);
    }
    catch(err){
        next(err);
    };
});

app.post('/register', async(req, res, next)=> {
    try{
        const user = await User.init()
            .then(()=>User.create(req.body));
        //sign in with token after registering
        res.send(user.generateToken());
    }
    catch(err){
        next(err);
    };
});

app.put('/update', isLoggedIn, async(req,res,next)=>{
    try{
        await User.init()
            .then(async() => {
                const user = await User.findById(req.user._id);
                await user.updateOne(req.body);
            })
        const updatedUser = await User.findById(req.user._id);
        updateUser.password = undefined;
        res.send(updatedUser);
    }
    catch(err){
        next(err)
    }
})

app.put('/password', isLoggedIn, async(req,res,next) => {
    try{
        const validate = await User.authenticate({email:req.user.email, password: req.body.oldPassword});
        if(validate){
            await User.init()
                .then(async() => {
                    const user = await User.findById(req.user._id);
                    user.password = req.body.newPassword;
                    await user.save();
                });
            const updatedUser = await User.findById(req.user._id);
            res.send(updatedUser);
        }
    }
    catch(err){
        next(err);
    };
});

module.exports = app;
