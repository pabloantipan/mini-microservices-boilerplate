const express = require("express");
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const POSTS = {};

app.get('/', (req, res) => {
  const def_response = {
    hiThere: `I'm the posts server!`,
    useCases: [
      `GET /posts`,
      'POST /post'
    ],
  };
  res.status(200).send(def_response);
});

app.get('/posts', (req, res) => {
  res.send(POSTS);
});

app.post('/post', (req, res) => {
  // { title: string }
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  POSTS[id] = { id, title };

  res.status(201).send(POSTS[id]);
});

app.listen(4000, () => {
  console.log('post service listening on port 4000');
});