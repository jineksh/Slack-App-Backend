import bodyParser from 'body-parser'
import express from 'express'

import connectDb from './config/db.js';
import config from './config/server.js';
import globalErrorHandler from './middlewares/error.js'
import apiRoutes from './routes/index.js'
import emailWorker from './worker/mail.js';


const server = async() =>{


    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.get('/ping',(req,res,next)=>{
        res.send('pong');
        next();
    })

    app.use('/api',apiRoutes);
    app.use(globalErrorHandler);
    emailWorker('emailQueue');

    app.listen(config.PORT,() => {
        console.log('Server is running on port 3001');
        connectDb();
    })


}

server();