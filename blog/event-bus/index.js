const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const APP_PORT = 4005;
app.use(bodyParser.json());

app.post('/events', (req, res)=> {
  const event = req.body;
  console.log(event);

  axios.post('http://localhost:4000/events', event).catch((err) => { console.log(err.message) });
  axios.post('http://localhost:4001/events', event).catch((err) => { console.log(err.message) });
  axios.post('http://localhost:4002/events', event).catch((err) => { console.log(err.message) });

  res.send({ status: 'OK' });
});

app.listen(APP_PORT, () => {
  console.log(`event-bus service listening on port ${APP_PORT}`);
});