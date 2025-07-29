import bodyParser from 'body-parser'
import express from 'express'

import connectDb from './config/db.js';
import config from './config/server.js';
import apiRoutes from './routes/index.js'


const server = async() =>{


    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.get('/ping',(req,res,next)=>{
        res.send('pong');
        next();
    })

    app.use('/api',apiRoutes);

    app.listen(config.PORT,() => {
        console.log('Server is running on port 3001');
        connectDb();
    })


}

server();