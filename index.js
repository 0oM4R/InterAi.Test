const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const routes = require('./modules/routes');
const connection = require('./config/DB.config');


const MongoStore = require('connect-mongo')(session);

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/**
 * -------------- SESSION SETUP ----------------
 * setup session to store user credentials
 */

const sessionStore = new MongoStore({
    mongooseConnection: connection,
    collection: 'sessions'
});

app.use(session({
    secret: process.env.SECRET || "qwertyuikjhgfds", //secret key to identify session
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

// Need to require the entire Passport config module so ./index.js knows about it
require('./config/passport.config');

app.use(passport.initialize());
app.use(passport.session());

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);


/**
 * Server listens on hostPort form .env file OR  http://localhost:3000
 * 
 */
app.listen(process.env.hostPort || 3000);