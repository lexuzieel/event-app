module.exports = function (app) {
    require('./prefix')(app)

    require('./auth')(app)

    app.prefix('/api', (router) => {
        require('./api')(app, router)
    })
}
