const app = require('express');
const UserRoute = app.Router();
const controller = require('../controller/controller.js')
const service = require('../service/render.js')

UserRoute
    .get('/', service.homeroute)
    .post('/team', controller.findall)
    .post('/myinfo', controller.findone)
    .post('/api', controller.newUser)
    .post('/team/memberinfo', controller.memberinfo)

module.exports = UserRoute;