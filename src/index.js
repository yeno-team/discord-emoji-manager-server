'use strict';

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import session from 'express-session';
import serverless from 'serverless-http';
import routes from './core/routes';
import Refresh from 'passport-oauth2-refresh';
import passport from 'passport';
import PassportStrategy from './core/passport';


const app = express();

// Express initialize

app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: '/',
        domain: 'yourdomain.com',
        maxAge: 1000 * 60 * 24
    }
}));

// Passport initialize

passport.use(PassportStrategy);
Refresh.use(PassportStrategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});


for(let route in routes) {
    app.use("/.netlify/functions/index/emoji-manager/" + route, routes[route]);
}



export default app;
export const handler = serverless(app);