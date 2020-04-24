// Create pooled data connection.
var mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/expense_tracker';
let options = { useNewUrlParser: true  };
mongoose.connect(DB_URI, options);

var express = require('express');
var http    = require('http');
var path    = require('path');
var engine  = require('ejs-locals');
var app     = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

console.log("Server Ready");

// Enable routing and use port 1337.
require('./router')(app);
app.set('port', 1337);

// Set up ejs templating.
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// Set view folder.
app.set('views', path.join(__dirname, 'views'));
 

//app.set('view engine', 'handlebars');
 
// That line is to specify a directory where you could 
// link to static files (images, CSS, etc.). 
// So if you put a style.css file in that directory and you 
// could link directly to it in your view <link href=”style.css” rel=”stylesheet”>
app.use(express.static(path.join(__dirname, 'static')));
var cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
