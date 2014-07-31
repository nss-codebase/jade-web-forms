'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
  res.render('home');
});

app.get('/calc', function(req, res){
  res.render('calc');
});

app.post('/calc', function(req, res){
  var x = req.body.x * 1;
  var y = req.body.y * 1;
  var ans;

  switch(req.body.op){
    case '+':
      ans = x + y;
      break;
    case '-':
      ans = x - y;
      break;
    case '*':
      ans = x * y;
      break;
    case '/':
      ans = x / y;
  }

  res.render('calc', {x:x, y:y, op:req.body.op, ans:ans});
});

var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express is now listening on PORT', port);
});

