var path = require('path');
var express = require('express');

var app = express();

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

app.listen(7000, function() {
  console.log('listening @ port 7000');
});