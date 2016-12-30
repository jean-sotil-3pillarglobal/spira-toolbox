var config = require("./config")(); //import config file.
var express = require("express");
var app = express();

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
}); 

app.use(express.static(__dirname+"/public")) //where to look for static files.
app.use(express.static(__dirname+"/node_modules")) // reading fonts path from bootstrap.
app.use(express.static(__dirname+"/node_modules/bootstrap-less")) // reading fonts path from bootstrap.

app.get('/[^\.]+$', function(req, res){
    res.set('Content-Type', 'text/html')
        .sendFile(__dirname + '/public/index.html');
});

app.listen(config.port);
console.log("Running on port "+ config.port);