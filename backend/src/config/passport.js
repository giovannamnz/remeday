// backend/src/config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const AppleStrategy  = require('passport-apple');
const User = require('../models/User');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
  User.findById(id)
      .then(u => done(null, u))
      .catch(done)
);

// Google OAuth
passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:  '/auth/google/callback'
  },
  async (_, __, profile, done) => {
    try {
      const email = profile.emails[0].value;
      let user = await User.findOne({ 'oauth.googleId': profile.id }) 
               || await User.findOne({ email });
      if (!user) {
        user = await User.create({
          name: profile.displayName,
          email,
          oauth: { googleId: profile.id },
          dateOfBirth: new Date(),      // ou deixe data vazia p/ atualizar depois
          termsAccepted: true           // ou ajuste conforme sua regra
        });
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
  }
));

// Apple OAuth
passport.use(new AppleStrategy({
    clientID:         process.env.APPLE_CLIENT_ID,
    teamID:           process.env.APPLE_TEAM_ID,
    keyID:            process.env.APPLE_KEY_ID,
    privateKeyString: process.env.APPLE_PRIVATE_KEY,
    callbackURL:      '/auth/apple/callback',
    scope:            ['email', 'name']
  },
  async (accessToken, refreshToken, idToken, profile, done) => {
    try {
      const email = profile.email;
      let user = await User.findOne({ 'oauth.appleId': profile.id }) 
               || await User.findOne({ email });
      if (!user) {
        user = await User.create({
          name: `${profile.name.firstName} ${profile.name.lastName}`,
          email,
          oauth: { appleId: profile.id },
          dateOfBirth: new Date(),
          termsAccepted: true
        });
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
  }
));
