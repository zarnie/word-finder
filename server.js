var express = require('express');
var _ = require('underscore');
var app = express();

var config = require('./lib/config');
var words = require('./lib/words');

app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use('/public', express.static('public'));

app.use(express.bodyParser());

app.use(app.router);

app.get('/', function (req, res) {
  res.render('index', { pattern: null });
});

app.post('/search', function (req, res) {
  var searchResult = words.search(req.body.pattern);
  var result = searchResult.result;
  res.render('result', { words: result, searchResult: searchResult, pattern: req.body.pattern });
});

app.listen(process.env.PORT || config.port);
console.log("Listening on port: " + (process.env.PORT || config.port));
