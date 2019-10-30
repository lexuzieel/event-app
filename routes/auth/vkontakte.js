const VKontakteStrategy = require('passport-vkontakte').Strategy

module.exports = function (express, app, passport) {
    passport.use(new VKontakteStrategy({
        clientID: process.env.VKONTAKTE_APP_ID,
        clientSecret: process.env.VKONTAKTE_APP_SECRET,
        callbackURL: app.url('auth/vkontakte/callback')
    },
        function (accessToken, refreshToken, params, profile, done) {
            // Put the user in the database here.
            // Generate JWT.
            done(null, profile)
        }
    ))

    app.prefix('/auth', (router) => {
        router.get('/vkontakte',
            passport.authenticate('vkontakte'),
            function (req, res) {
                // The request will be redirected to vk.com for
                // authentication, so this function will not be called.
            });

        router.get('/vkontakte/callback',
            passport.authenticate('vkontakte'),
            function (req, res) {
                res.json({
                    message: 'success'
                })
            });
    })
}
