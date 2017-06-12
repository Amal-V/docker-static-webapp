var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
const response = {
  status: 'ok',
  app: 'Static WebApp',
  branch : 'master'
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/')));
app.get('/health', function (req, res, next) {
  return res.send(response);
});
app.use(redirectUnmatched);

function redirectUnmatched(req, res) {
  res.redirect("/");
}

app.listen(9000, function () {
  console.log('Static web server listening at port 9000');
});