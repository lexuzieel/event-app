module.exports = function (app) {
    app.get('/auth/logout', function (req, res) {
        req.session.destroy()
        res.end()
    });

    require('./vkontakte')(app)
}
