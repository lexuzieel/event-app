const { User } = require('../../../models')

module.exports = function (app, router) {
    router.prefix('/users', (router) => {
        router.get('/me', function (req, res) {
            if (req.user) {
                res.send(req.user)
            } else {
                res.status(401).end()
            }
        })

        router.get('/:id', function (req, res) {
            User.findByPk(req.params.id).then(user => {
                if (user) {
                    res.send(user)
                } else {
                    res.status(404).end()
                }
            })
        })
    })
}
