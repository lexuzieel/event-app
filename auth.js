import { initialize, session, serializeUser, deserializeUser } from 'passport';

export default function (express, app) {
    app.use(initialize());
    app.use(session());

    serializeUser(function (user, done) {
        if (user) {
            done(null, user.id);
        } else {
            done(new Error('Unable to serialize user.'))
        }
    });

    deserializeUser(function (id, done) {
        done(null, {
            id: 'mlem'
        })

        // Fetch existing user from the database.

        // User.findById(id, function (err, user) {
        //     done(err, user);
        // });
    });
}
