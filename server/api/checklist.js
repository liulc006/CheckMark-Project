const express = require('express');
const app = express.Router();
const { Checklist } = require('../db');
const isLoggedIn = require('./middleware'); //will not work without passing {header => authorization token}

//Get all the Checklists from userId
app.get('/', isLoggedIn, async(req,res,next)=> {
    try{
        const checklists = await Checklist.find({userId: req.user._id});
        res.send(checklists);
    }
    catch(err){
        next(err);
    };
});

module.exports = app;