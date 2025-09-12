require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const storageRoutes = require('./routes/storageRoutes');

const allowedOrigin = [
    process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
];

const corsOptions = {
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'username'],
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json({ limit: process.env.REQUEST_SIZE_LIMIT || '50mb' })); 
app.use(express.urlencoded({ limit: process.env.REQUEST_SIZE_LIMIT || '50mb', extended: true }));
app.use((req, res, next) =>{
    console.log(req.path, req.method)
    if (req.url === '/' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Wassup amigo');
    }
    next();
})
app.use('/api/user', userRoutes);
app.use('/api/storage', storageRoutes);

mongoose.connect(process.env.mongoDB)
.then(() => {
    console.log("MongoDB connected");
})
.catch((error) => {
    console.error("MongoDB connection failed:", error);
}); 

app.listen(process.env.PORT, () => {
    console.log('Server listening on port', process.env.PORT);
});