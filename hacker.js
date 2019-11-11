const express = require('express');

const app = express();

app.get('/hacking', (req, res) => {
  console.log(`hacked : ${req.query.secret}`);
  console.log(`object : ${decodeURIComponent(req.query.secret)}`);
  res.send('hello there');
});

app.listen(3000, () => {
  console.log('hacker server port 3000');
});
