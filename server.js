const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const todos = ['eat lunch', 'buy a new phone'];

app.get('/home', (req, res) => {
  fs.readFile('home.html', (err, data) => {
    res.send(data.toString());
  });
});

app.get('/todos', (req, res) => {
  let html = '';
  for (let i = 0; i < todos.length; i++) {
    html += `<div>${todos[i]}</div>`;
  }
  // html = html.replace(/</gi, '&#60;');
  html += "<a href='/home'>home</a>";
  console.log(html);
  res.send(html);
});

app.post('/todo', (req, res) => {
  console.log(`new todo : ${req.body.todo}`);
  todos.push(req.body.todo);
  for (let i = 0; i < todos.length; i++) {
    console.log(`todo( ${i} ) : ${todos[i]}`);
  }
  console.log(`todos : ${todos}`);
  res.redirect('/home');
});

app.get('/login', (req, res) => {
  console.log(req.query);
  const secretCookie = 'ABCDEF123456';
  res.cookie('user', { secret: secretCookie, user_id: req.query.user_id });
  console.log('login success!');
  res.redirect('/home');
});

// http://kor.pe.kr/util/4/charmap2.htm
app.get('/escape', (req, res) => {
  res.send(`&#60;hello world&#62;`);
});

app.listen(80, () => {
  console.log('ok');
});
