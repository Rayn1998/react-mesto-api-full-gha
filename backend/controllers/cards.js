const Card = require('../models/cards');
const BadRequestError = require('../middlewares/BadReqErr');
const NotFoundError = require('../middlewares/NotFoundErr');
const ForbiddenError = require('../middlewares/ForbiddenErr');

const getCards = async (req, res, next) => {
  let cards;
  try {
    cards = await Card.find({}).populate(['owner', 'likes']);
    res.status(200).json(cards);
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const id = req.user._id;

  (await Card.create({ name, link, owner: id }))
    .populate('owner')
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new BadRequestError('Введите корректные данные');
        next(error);
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (req.user._id !== card.owner.valueOf()) {
        throw new ForbiddenError(
          'Вы не можете удалить карточку другого пользователя',
        );
      }
      card.deleteOne().then(() => {
        res.status(200).send({ message: 'Карточка успешно удалена' });
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введён некорректный id карточки'));
      } else {
        next(err);
      }
    });
};

const addLike = async (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;

  try {
    const handleLike = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    ).populate(['likes', 'owner']);
    if (!handleLike) {
      next(new NotFoundError('Карточка не найдена'));
    } else {
      res.send({ card: handleLike });
    }
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError('Произошла ошибка: неверная карточка'));
    } else {
      next(e);
    }
  }
};

const removeLike = async (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  try {
    const disLike = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    ).populate(['likes', 'owner']);
    if (disLike) {
      res.send({ card: disLike });
    } else {
      next(new NotFoundError('Карточка не найдена'));
    }
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError('Произошла ошибка: неверная карточка'));
    } else {
      next(e);
    }
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};
