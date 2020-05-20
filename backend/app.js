import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes/index.js';

const app = express();

/**
    * Connect to the database
    */

mongoose.connect('mongodb://root:example@mongodb:27017/essence?authSource=admin');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("DB Connection - OK!")
});
//TODO: CHANGE IT TO mongodb
/**
    * Middleware
    */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// catch 400
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(400).send(`Error: ${res.originUrl} not found`);
    next();
});

// catch 500
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send(`Error: ${err}`);
    next();
});

/**
    * Register the routes
    */

routes(app);

export default app;