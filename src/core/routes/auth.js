'use strict';

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import passport from 'passport';
import { graphqlUploadExpress } from 'graphql-upload';

const router = express.Router();

const scopes = ['identify', 'guilds'];
const redirectBase = process.env.REDIRECT_BASE;

router.get("/", passport.authenticate('discord', { scope: scopes }), (req, res) => {});

router.get("/callback",  passport.authenticate('discord', { failureRedirect: redirectBase + "/login?error=1" }), (req, res) => {
    res.redirect(redirectBase + 'dashboard');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(redirectBase + 'login');
});

router.get("/me", checkAuth, (req, res) => {
    res.json(req.user);
});

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(401);
    res.json({
        status: {
            message: "User is not authorized!",
            succeeded: false
        }
    });
}

export default router;