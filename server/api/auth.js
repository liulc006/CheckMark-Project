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
        next(err)
    }
});

app.get('/', isLoggedIn, (req,res, next)=>{
    try{
        res.send(req.user)
    }
    catch(err){
        next(err)
    }
})

module.exports = app;
