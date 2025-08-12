import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import {createServer} from 'http'
import { Server } from 'socket.io';

import connectDb from './config/db.js';
import config from './config/server.js';
import roomHandler from './controllers/channeljoin.js';
import messageHandler from './controllers/socketapis.js';
import globalErrorHandler from './middlewares/error.js'
import apiRoutes from './routes/index.js'
import emailWorker from './worker/mail.js';


const startserver = async() =>{


    const app = express();
    const server = createServer(app);
    const io = new Server(server);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    
    app.get('/ping',(req,res,next)=>{
        res.send('pong');
        next();
    })

    app.use('/api',apiRoutes);
    app.use(globalErrorHandler);
    emailWorker('emailQueue');


    io.on('connection',(socket)=>{
        console.log('new connection',socket.id);

       

        messageHandler(io,socket);
        roomHandler(io,socket);
    })

    







    server.listen(config.PORT,() => {
        console.log('Server is running on port 3001');
        connectDb();
    })


}

startserver();