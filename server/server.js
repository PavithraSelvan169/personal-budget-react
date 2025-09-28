// Budget API

const express = require('express');
const cors = require('cors');

//import data from JSON file
const budget_data = require('./budget_data.json')

const app = express();
const port = 3000;

app.use('/', express.static('public'));
app.use(cors());

app.get('/hello', (req, res) => {
    res.send("Hello World!, This is Pavithra's Personal Budget homepage");
});

app.get('/budget', (req, res) => {
    res.json(budget_data);
    });

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});

