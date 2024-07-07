import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
import multer from 'multer';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage });
const app = express();
app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const server = http.createServer(app)



const MONGO_URL = 'mongodb+srv://admin:admin@cluster0.veaulc2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
mongoose.connection.on('error', (error: Error) => console.log(error))

app.use('/',  router())


server.listen(8080,() => {
    console.log('Server running on http://localhost:8080/');
})