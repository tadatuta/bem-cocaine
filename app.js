#!/opt/nodejs/0.10/bin/node

/**
 * Module dependencies.
 */

var express = require('express'),
    app = express();

// all environments
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
//app.use(express.methodOverride());
app.use(express.static(__dirname + '/desktop.bundles/index'));
//app.use(express.errorHandler());

var http = require('http');

app.set('handle', process.env.PORT || 3000);

var server = http.createServer(app);

var BEMHTML = require('./desktop.bundles/index/_index.bemhtml.js').BEMHTML,
    BEMTREE = require('./desktop.bundles/index/index.bemtree.js').BEMTREE;

app.get('/', function(req, res) {
    BEMTREE.apply()
        .then(function(bemjson) {
             res.send(BEMHTML.apply(bemjson));
        });
});

server.listen(app.get('handle'), function() {
    console.log('Express server listening on ' +
        app.get('handle'));
});
