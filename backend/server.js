// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import { notFound ,errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
connectDB();

// Middlewares
app.use(cors());
app.use(express.json())

// Routes
app.use('/api/auth',authRoutes)
app.use('/api/todos',todoRoutes)

// Home Route
app.get('/',(req,res)=>{
    res.send('API is Running Successfully !')
})

// Error Handler Middleware
// Fallback for request that didn't match any route
app.use(notFound);
// Custom central error handler to format all responses
app.use(errorHandler)

app.get('/',(req,res)=>{
    res.send('API is Running Successfully !')
})

app.listen(process.env.PORT , ()=>{
    console.log(`Server is Running on PORT : ${process.env.PORT}`);
})