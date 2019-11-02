module.exports = function (express, app, router) {
    require('./users')(express, app, router)
}
