
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const busRoutes = require('./routes/bus');
const ticketRoutes = require('./routes/ticket');
const adminRoutes = require('./routes/admin');

const { MONGODB_URI } = require('./keyInfo');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.json());

app.use(authRoutes);
app.use(busRoutes);
app.use(ticketRoutes);
app.use(adminRoutes);

app.use((error, req, res, next) => {
    console.log('Error occured', error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message,
        success: false,
        data: data
    });
});

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    app.listen(8080);
    console.log('Connected!');
})
.catch(error => console.log(error));