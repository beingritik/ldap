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
// app.get("/", function(req, res){
//     res.render('index')
// })

app.use('/css', express.static(path.join(__dirname, "public/css")));
app.use('/css', express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
app.use('/images', express.static(path.join(__dirname, "public/images")));
// app.use('/js', express.static(path.join(__dirname, "public/js")));

app.use('/', require('./routes/router'));

app.listen(port, () => {
    console.log('server is running at port :', port);
});  