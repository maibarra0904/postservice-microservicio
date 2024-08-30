const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors')
const axios = require('axios')

const app = express();
app.use(bodyParser.json());
app.use(cors())  // Enable CORS for all routes

const posts = [];

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts.push({
    id,
    title
  })

  await axios.post('http://localhost:4005/events', {
    type: 'POST_CREATED',
    data: {
      id,
      title
    }
    })
  

  res.status(201).send({
    id,
    title
  });
});

app.post('/events', (req, res) => {
  console.log('Received event from post:', req.body);
  res.send('Event received');
});

app.listen(4000, () => {
  console.log('v20')
  console.log('Listening on 4000');
});
