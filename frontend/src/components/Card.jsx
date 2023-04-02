import React, {useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onImageClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext)

  const isOwn = card.owner._id === currentUser._id
  const isLiked = card.likes.some(i => i._id === currentUser._id)

  const cardDeleteButtonClassName = (
    `element__trash ${isOwn ? '' : 'element__trash_hidden'}`
  )
  const cardLikeButtonClassName = (
    `element__like ${isLiked ? 'element__like_active' : ''}`
  )

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleCardDelete() {
    onCardDelete(card)
  }

  return (
      <article className="element">
          <img className="element__image" src={card.link} alt={card.name}  onClick={onImageClick} />
          <div className={cardDeleteButtonClassName} onClick={handleCardDelete}></div>
          <div className="element__base">
              <h2 className="element__title">{card.name}</h2>
              <div className="element__like-container">
                  <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="Кнопка лайка"></button>
                  <span className="element__like-amount">{card.likes.length}</span>
              </div>
          </div>
      </article>
  )
}

export default Card