import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import {AuthRoute} from './routers/index.js'

dotenv.config()


const app=express();
const PORT = process.env.PORT ||5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true,limit:'50mb'}))
app.use(cors({ credentials: true, origin:true}));
app.use(cookieParser());


app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} `)
        })
app.get('/',(req,res)=>{
        res.send('Home');
    });
app.use('/api',AuthRoute)