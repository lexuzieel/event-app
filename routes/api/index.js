
module.exports = function (express, app, router) {
    router.get('/', function (req, res) {
        res.send(req.user)
    })
}
