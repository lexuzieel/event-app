module.exports = function (app, router) {
    require('./users')(app, router)
    require('./events')(app, router)
}
