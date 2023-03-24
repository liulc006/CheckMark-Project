const express = require('express');
const app = express();
const { conn } = require('./db')

const init = async() => {
    try{
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, ()=> console.log(`listening to port ${PORT}`))
    }
    catch(err){
        console.log(err);
    }
};

init();