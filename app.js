const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRouter');

const app = express();
app.set('query parser', 'extended');
// 1. MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

//Routes -- mainly resource routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
