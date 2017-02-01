const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 8000
app.use(express.static(path.join(__dirname + '/src')));
app.get('/', function(req, res) {
  res.sendFile(rootPath + '/src/index.html');
});

app.listen(port, function() {
  console.log('listening on port 8000...');
});
