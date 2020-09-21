const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

let gameData = undefined;

let logArray = [];
app.post('/add-to-log', (req, res) => {
  logArray.push(req.body.message);
  res.send(logArray);
});

app.post('/game-data', (req,res) => { 
  gameData = req.body;
  res.sendStatus(200);
});

app.get('/game-data', (req,res) => {
  res.send(gameData);
});

app.put('/reset', (req,res) => {
  gameData = undefined;
  logArray = [];
  logArray.push('New game started');
  res.send(logArray);
});

app.listen(8081, () => {
  console.log("Server listening on port 8081");
});