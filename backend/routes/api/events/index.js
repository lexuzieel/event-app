const _ = require('lodash')
const validator = require('validator')
const Sequelize = require('sequelize')
const { Event, EventType } = require('../../../models')

module.exports = function (app, router) {
    router.prefix('/events', (router) => {

        require('./types')(app, router)

        router.get('/', function (req, res) {
            let wheres = {}
            let typeWheres = {}

            if (req.query.name) {
                wheres.name = {
                    [Sequelize.Op.like]: `%${req.query.name}%`,
                }
            }

            if (req.query.type && validator.isInt(req.query.type)) {
                typeWheres.id = req.query.type
            }

            let limit = _.clamp(req.query.limit || 25, 1, 50)
            let offset = 0

            if (req.query.page &&
                validator.isInt(req.query.page) &&
                req.query.page > 0) {
                offset = limit * req.query.page
            }

            Event.findAll({
                include: [{
                    as: 'type',
                    model: EventType,
                    required: true,
                    where: typeWheres
                }],
                order: [
                    ['arranged_at', 'ASC'],
                ],
                where: wheres,
                limit: limit,
                offset: offset
            }).then(events => {
                res.send(events)
            })
        })

        router.get('/:id', function (req, res) {
            Event.findByPk(req.params.id).then(event => {
                if (event) {
                    res.send(event)
                } else {
                    res.status(404).end()
                }
            })
        })

        router.delete('/:id', function (req, res) {
            if (!req.user) {
                res.status(401).end()
            }

            Event.findByPk(req.params.id).then(event => {
                if (event) {
                    if (event.user_id == req.user.id) {
                        event.destroy().then(event => {
                            res.json({
                                message: 'success'
                            })
                        }).catch(err => {
                            res.status(400).end()
                            throw err
                        })
                    } else {
                        res.status(401).end()
                    }
                } else {
                    res.status(404).end()
                }
            })
        })

        router.post('/', function (req, res) {
            if (!req.user) {
                res.status(401).end()
            }

            let data = req.body

            data.user_id = req.user.id

            Event.create(data).then(event => {
                if (event) {
                    res.send(event)
                } else {
                    res.status(400).end()
                }
            }).catch(err => {
                res.status(400).end()
                throw err
            })
        })
    })
}
