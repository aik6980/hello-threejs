var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var server = http.createServer(app);
app.set('view engine', 'jade');
app.set('views', __dirname + '/src/views');
app.use(bodyParser());
app.use('/public', express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.render('index.jade');
});
var port = process.env.PORT || 3000;
var server = server.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});

//# sourceMappingURL=app.js.map
