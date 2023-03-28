const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require("dotenv");
const {conn, syncAndSeed } = require('./db');

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json({limit: '50 mb'}));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../src/index.html')));

app.use('/api/auth', require('./api/auth'));

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