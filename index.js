const express = require('express');
const fs = require('fs');
const app = express();
const data = require('./data.json');

app.use(express.json());

// Get user by id
app.get('/users/:id', (req, res) => {
  const user = data.users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.send(user);
});

// Get post by id
app.get('/posts/:id', (req, res) => {
  const post = data.posts.find((post) => post.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).send('Post not found');
  }
  res.send(post);
});

// Get all posts in range of 2 dates
app.get('/posts', (req, res) => {
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);
  const posts = data.posts.filter((post) => {
    const postDate = new Date(post.last_update);
    return postDate >= startDate && postDate <= endDate;
  });
  res.send(posts);
});

// Post method to change email by user id
app.post('/users/:id/email', (req, res) => {
  const user = data.users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send('User not found');
  }
  user.email = req.body.email;
  fs.writeFile('./data.json', JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Internal server error');
    }
    res.send(user);
  });
});

// Put method that allows creating a new post
app.put('/posts', (req, res) => {
  const user = data.users.find((user) => user.id === parseInt(req.body.userID));
  if (!user) {
    return res.status(404).send('User not found');
  }
  const post = {
    id: data.posts.length + 1,
    title: req.body.title,
    body: req.body.body,
    user_id: parseInt(req.body.userID),
    last_update: new Date().toISOString(),
  };
  data.posts.push(post);
  fs.writeFile('./data.json', JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Internal server error');
    }
    res.send(post);
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
