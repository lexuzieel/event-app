const _ = require('lodash')
const { EventType } = require('../../../../models')

module.exports = function (app, router) {
    router.prefix('/types', (router) => {
        router.get('/', function (req, res) {
            EventType.findAll({
                order: [
                    ['created_at', 'DESC'],
                ],
                limit: _.clamp(req.query.limit || 25, 1, 50)
            }).then(events => {
                res.send(events)
            })
        })

        router.get('/:id', function (req, res) {
            EventType.findByPk(req.params.id).then(event => {
                if (event) {
                    res.send(event)
                } else {
                    res.status(404).end()
                }
            })
        })
    })
}
