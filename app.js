const express = require('express');
const app = express();
const path = require("path");
const port = process.env.PORT || 3001;
const { default: mongoose } = require('mongoose');
const bodyparser = require('body-parser');

require("./db/connec");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.set("view engine", "ejs");

app.use('/css', express.static(path.join(__dirname, "assets/css")));
app.use('/css', express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));

app.use('/', require('./routes/router'));

app.listen(port, () => {
    console.log('server is running at port :', port);
});  