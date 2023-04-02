const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const BadRequestError = require('../middlewares/BadReqErr');
const SameUserError = require('../middlewares/SameUserErr');
const BadAuthError = require('../middlewares/BadAuthErr');
const NotFoundError = require('../middlewares/NotFoundErr');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({});
  } catch (err) {
    next(err);
  }
  res.send({ message: users });
};

const getMe = async (req, res, next) => {
  const id = req.user._id;
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Пользователь не найден'));
    } else {
      next(err);
    }
  }
  res.status(200).json(user);
};

const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findById(id).then((data) => {
      if (!data) {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        res.status(200).json(data);
      }
    });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then(() => res.status(201).send({
          name,
          about,
          avatar,
          email,
        }))
        .catch((e) => {
          if (e.name === 'ValidationError') {
            next(new BadRequestError('Введены некорректные данные'));
          } else if (e.code === 11000) {
            next(
              new SameUserError(
                'Пользователь с таким email уже зарегистрирован',
              ),
            );
          } else {
            next(e);
          }
        });
    })
    .catch(next);
};

const refreshProfile = async (req, res, next) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true },
    );
    res.status(200).json(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Произошла ошибка обновления профиля'));
    } else {
      next(err);
    }
  }
};

const refreshAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const userAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true },
    );
    res.status(200).send(userAvatar);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Произошла ошибка обновления профиля'));
    } else {
      next(err);
    }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        next(new BadAuthError('Неправильные почта или пароль'));
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ _id: user._id }, 'secret', {
            expiresIn: '7d',
          });
          res.json({ token });
        } else {
          next(new BadAuthError('Неправильные почта или пароль'));
        }
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getUsers,
  getUser,
  getMe,
  createUser,
  refreshProfile,
  refreshAvatar,
  login,
};
