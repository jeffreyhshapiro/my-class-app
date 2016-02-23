var express = require('express');
var app = express();
var handlebars = require('express-handlebars');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var PORT = 8000;

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))

var connection = new Sequelize('student_teacher_db', 'root');

var studentInfo = connection.define('student_info', {
  student_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  student_email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  student_password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

var instructorInfo = connection.define('instructor_info', {
  instructor_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  instructor_email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  instructor_password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


app.get('/', function(req, res) {
  res.render('home')
});

app.get('/students', function(req, res) {
  res.render('students')
});

app.post('/student-register', function(req, res){
  var studentName = req.body.studentNameRegistration
  var studentEmail = req.body.studentEmailRegistration
  var studentPassword = req.body.studentPasswordRegistration

  studentInfo.create({
    student_name : studentName,
    student_email : studentEmail,
    student_password : studentPassword
  }).then(function(result){
    res.redirect('/') //make it redirect to a successful login page
  }).catch(function(err){
    if (err) {throw err};
    console.log(err);
  });
});

app.post('/student-login', function(req, res){
  res.send('this is the student login page')
})

app.get('/instructors', function(req, res) {
  res.render('instructors');
});

app.post('/instructor-register', function(req,res){
  var instructorName = req.body.instructorNameRegistration
  var instructorEmail = req.body.instructorEmailRegistration
  var instructorPassword = req.body.instructorPasswordRegistration

  instructorInfo.create({
    instructor_name : instructorName,
    instructor_email : instructorEmail,
    instructor_password : instructorPassword
  }).then(function(result){
    res.redirect('/') //make it redirect to a successful login page
  }).catch(function(err){
    if (err) {throw err};
    console.log(err);
  });
});

app.post('/instructor-login', function(req, res){
  res.send('this is the login instructor page')
})

connection.sync().then(function() {
  app.listen(PORT, function() {
      console.log("Listening on:" + PORT)
  });
});
