const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../schema/users.schema');
const validPassword = require('../modules/lib/passUtils').validPassword;

const customFields = {
    usernameField: 'userName',
    passwordField: 'password'
};

const verifyCallback = (username, password, done) => {

    userModel.findOne({ userName: username })
        .then((user) => {

            if (!user) { return done(null, false) }

            const isValid = validPassword(password, user.password);

            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {
            done(err);
        });

}

const strategy = new LocalStrategy(customFields, verifyCallback);


/**
 * Using Local Strategy as Middleware
 */
passport.use(strategy);



passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    userModel.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});