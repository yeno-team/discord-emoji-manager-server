import passport from 'passport';
import DiscordStrategy from 'passport-discord';
import { createUser } from '../lib/faunadb';


import dotenv from 'dotenv';
dotenv.config();

export default new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, ( accessToken, refreshToken, profile, done ) => {
    profile.refreshToken = refreshToken;
     profile.accessToken = accessToken;
    createUser({
        id: profile.id
    });

    process.nextTick(function() {
        return done(null, profile);
    });
});