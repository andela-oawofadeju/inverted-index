const express = require('express');
const path = require('path');
const app = express();
let rootPath = path.normalize(__dirname);
app.use(express.static(rootPath));

app.get('/', function(req, res) {
  res.sendFile(rootPath + '/src/index.html');
});

app.listen(process.env.PORT || 8000, function() {
  console.log('listening on port 8000...');
});
