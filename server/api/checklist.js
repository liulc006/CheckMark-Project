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

//add new checklist to DB
app.post('/add', isLoggedIn, async(req,res,next) => {
    try{
        const checklist = await Checklist.create({userId: req.user._id, ...req.body});
        res.send(checklist);
    }
    catch(err){
        next(err);
    };
});

app.delete('/delete', isLoggedIn, async(req,res,next)=> {
    try{
        const checklist = await Checklist.deleteOne({_id: req.body._id, userId:req.user});
        res.sendStatus(200)
    }
    catch(err){
        next(err);
    };
});

module.exports = app;