const express = require('express');
const app = express();
const {conn, syncAndSeed } = require('./db')

const init = async() => {
    try{
        await syncAndSeed();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, ()=> console.log(`listening to port ${PORT}`))
    }
    catch(err){
        console.log(err);
    }
};

init();