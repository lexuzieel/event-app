const _ = require('lodash')
const passport = require('passport')
const { User } = require('../../models')
const VKontakteStrategy = require('passport-vkontakte').Strategy

module.exports = function (express, app) {
    passport.use(new VKontakteStrategy({
        clientID: process.env.VKONTAKTE_APP_ID,
        clientSecret: process.env.VKONTAKTE_APP_SECRET,
        callbackURL: app.url('auth/vkontakte/callback'),
        profileFields: [
            'photo_max_orig',
        ],
    },
        function (accessToken, refreshToken, params, profile, done) {
            // Put the user in the database here.

            let data = {
                profileId: profile.id,
                name: profile.displayName,
                username: profile.username,
                profileUrl: profile.profileUrl,
                avatarUrl: _.get(_.find(
                    profile.photos, {
                    type: 'photo_max_orig'
                }), 'value'),
            }

            User.upsert(data).then(result => {
                User.findOne({ profile_id: profile.id }).then(user => {
                    done(null, user)
                })
            })
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
