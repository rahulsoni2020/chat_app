
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {app, server} = require('./socket');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());


dotenv.config();
const PORT = process.env.PORT || 8080;

const connectDB = require('./config/db');
connectDB();

const routes = require('./src/routes/routing');
app.use((req,res,next)=>{
    console.log('dsdsa');
    next();
})
app.use('/api', routes);

server.listen(PORT, ()=>{
    console.log(`app listing to ${PORT}`);
});