module.exports = function (express, app) {
    require('./prefix')(express, app)

    require('./auth')(express, app)

    app.prefix('/api', (router) => {
        require('./api')(express, app, router)
    })
}
