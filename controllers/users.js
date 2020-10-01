/*eslint-env es6*/
const UserModel = require('../models/user.js');


module.exports.getUsers = (req, res) => {
  UserModel.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));
};

module.exports.getUserById = (req, res) => {
  UserModel.findById(req.params._id)
    .orFail(new Error('not found'))
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.message === "not found") {
        res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
      } else {
        res.status(500).send({ message: "Ошибка сервера" });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  let paramObj = {};
  if (name) { paramObj.name = name; }
  if (about) { paramObj.about = about; }

  UserModel.findByIdAndUpdate(req.params._id, paramObj, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .orFail(new Error('not found'))
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.message === "not found") {
        res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
      } else {
        res.status(500).send({ message: "Ошибка сервера" });
      }
    });
};
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  UserModel.findByIdAndUpdate(req.params._id, { avatar }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .orFail(new Error('not found'))
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.message === "not found") {
        res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
      } else {
        res.status(500).send({ message: "Ошибка сервера" });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  UserModel.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
      } else {
        res.status(500).send({ message: "Ошибка сервера" });
      }
    });
};
