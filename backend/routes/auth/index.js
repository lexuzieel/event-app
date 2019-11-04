module.exports = function (app) {
    app.get('/auth/logout', function (req, res) {
        req.session.destroy()
        res.redirect(`${process.env.VUE_APP_FRONTEND_URL || ''}/`)
    });

    require('./vkontakte')(app)
}
