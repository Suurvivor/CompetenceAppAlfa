const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', function(req, res, next){
  res.status(200).json({
    succes: true
  });
  console.log(1);
});


app.listen(5000, console.log(`Server is listening`));