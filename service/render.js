
var mongoose = require('mongoose');
const userModel = require('../db/users');
exports.homeroute = (req, res) => {
    res.render('index');
}

