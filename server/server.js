import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import http from 'http'
import { connectDB } from './lib/db.js';

//Create Express app and Http Server
const app = express();
const server = http.createServer(app);//to support socket.io

//Middleware setup
app.use(express.json(express.json({limit:"4mb"})))
app.use(cors())

//Connect to MongoDB
await connectDB();

app.use('/api/status',(req,res)=>res.send('Server is live'));

const PORT = process.env.PORT || 5000;
server.listen(PORT,()=>console.log('Server is running on PORT: '+PORT))