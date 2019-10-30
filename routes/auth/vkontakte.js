import { use, authenticate } from 'passport'
import { Strategy as VKontakteStrategy } from 'passport-vkontakte'

export default function (express, app) {
    use(new VKontakteStrategy({
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
            authenticate('vkontakte'),
            function (req, res) {
                // The request will be redirected to vk.com for
                // authentication, so this function will not be called.
            });

        router.get('/vkontakte/callback',
            authenticate('vkontakte'),
            function (req, res) {
                res.json({
                    message: 'success'
                })
            });
    })
}
