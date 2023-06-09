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
app.use('/static', express.static(path.join(__dirname, '../static')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../static/index.html')));

app.use('/api/auth', require('./api/auth'));
app.use('/api/checklist', require('./api/checklist'));

const init = async() => {
    try{
        if(process.env.DATABASE_URL === 'mongodb://localhost:27017/checkmark-app'){
            await syncAndSeed();
        }
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, ()=> console.log(`listening to port ${PORT}`))
    }
    catch(err){
        console.log(err);
    }
};

init();