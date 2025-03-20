import express from 'express';
import{config} from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connect } from 'mongoose';
import { connectDB } from './database/db.js';
import {errorMiddlewares} from "./middlewares/errorMiddlewares.js";

import bookRouter from "./routes/bookRouter.js" //fetching bookRouter

export const app = express();

config({path: "./config/config.env"}); //saving this path ensures that in server.js, ${process.env.PORT} gives port 5000 not undefined


app.use(cors({
    origin: [process.env.FRONTEND_URI],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
})); //cors is a middleware that allows for cross-origin requests
//middlewares are stored in the app.use() method
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1/book', bookRouter); //using the bookRouter

connectDB();
//connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

app.use(errorMiddlewares);