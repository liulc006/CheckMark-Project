const express = require('express');
const app = express.Router();
const { Checklist } = require('../db');
const isLoggedIn = require('./middleware');
//CAN BE MAKE MORE SECURE BY IMPLEMENTING 'isLoggedIn' and passing token during API request

//Get all the Checklists from userId
app.get('/:id', async(req,res,next)=>{
    try{
        const checklists = await Checklist.find({userId: req.params.id });
        res.send(checklists);
    }
    catch(err){
        next(err);
    }
});

// app.get('/', async(req,res,next)=> {
//     const checklists = await Checklist.find();
//     console.log(checklists)
//     res.send(checklists);
// });

module.exports = app;