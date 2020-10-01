/*eslint-env es6*/
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require("express-rate-limit");
const bodyParser = require('body-parser');
const routeCards = require('./routes/cards.js');
const routeUsers = require('./routes/users.js');

const { PORT = 3000 } = process.env;
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
      _id: '5f6f1a32cf90cf25e431aff1' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('/users', routeUsers);
app.use('/cards', routeCards);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
