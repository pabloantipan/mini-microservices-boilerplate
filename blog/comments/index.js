const express = require("express");
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
const APP_PORT = 4001;
app.use(bodyParser.json());

const COMMENTS_BY_POST_ID = {};

app.get('/', (req, res) => {
  const def_response = {
    hiThere: `I'm the comments server!`,
    useCases: [
      `GET /posts/:id/comments`,
      'POST /posts/:id/comments'
    ],
  };
  res.status(200).send(def_response);
});

app.get('/posts/:id/comments', (req, res) => {
  res.send(COMMENTS_BY_POST_ID[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  // { content: string }
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = COMMENTS_BY_POST_ID[req.params.id] || [];

  comments.push({ id: commentId, content });

  COMMENTS_BY_POST_ID[req.params.id] = comments;

  res.status(201).send(comments);
});


app.listen(APP_PORT, () => {
  console.log(`comments service listening on port ${APP_PORT}`);
});