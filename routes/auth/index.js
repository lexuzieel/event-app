const passport = require('passport')

module.exports = function (express, app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        if (user) {
            done(null, user.id);
        } else {
            done(new Error('Unable to serialize user.'))
        }
    });

    passport.deserializeUser(function (id, done) {
        // Fetch existing user from the database.

        // User.findById(id, function (err, user) {
        //     done(err, user);
        // });
    });

    require('./vkontakte')(express, app, passport)
}
