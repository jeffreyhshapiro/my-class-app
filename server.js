var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var PORT = 8000;

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res) {
  res.render('home')
});

app.get('/students', function(req, res) {
  res.render('students')
});

app.get('/instructors', function(req, res) {
  res.render('instructors')
});


app.listen(PORT, function(){
  console.log('listening on port %s', PORT);
});
