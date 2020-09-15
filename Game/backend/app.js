const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

let logArray = [];
app.post('/add-to-log', (req, res)=> {
      logArray.push(req.body.message);
      res.send(logArray);
});

app.listen(8081, () => {
  console.log("Server listening on port 8081");
});