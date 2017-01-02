var config = require("./config")(); //import config file.
var express = require("express");
var cors = require("cors");
var app = express();

app.use(express.static(__dirname+"/public")) //where to look for static files.
app.use(express.static(__dirname+"/node_modules")) // reading fonts path from bootstrap.
app.use(express.static(__dirname+"/node_modules/bootstrap-less")) // reading fonts path from bootstrap.

app.get('/[^\.]+$', cors({
  origin: 'https://spira.dxide.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}),function(req, res){
    res.set('Content-Type', 'text/html')
        .sendFile(__dirname + '/public/index.html');
});

app.listen(config.port);
console.log("Running on port "+ config.port);