import express from 'express';
import Friendship from '../db/users/User-Friends';

const app = express();

app.get('/users', (req, res) => {
  Friendship.findAll({
    where: {
      userId: req.body,
    },
  })
  .then((friends) => {
    res.json(friends);
  });
  // res.send();
});


app.post('/users', (req, res) => {
  res.send();
});

export default app;
