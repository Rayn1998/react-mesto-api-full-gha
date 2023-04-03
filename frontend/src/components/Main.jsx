import React, { useContext } from 'react';
import avatar from '../images/avatar.jpg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  props,
  cards, 
}) {
  const currentUser = useContext(CurrentUserContext)
  const {
    handleEditAvatarClick, 
    handleEditProfileClick, 
    handleAddPlaceClick, 
    handleCardClick, 
    handleRemoveCardClick, 
    handleCardLike 
  } = props

  return (
    <main className="page">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <img className="profile__avatar" src={currentUser.avatar || avatar} alt="Изображение профиля" />
            <div className="profile__avatar-overlay" onClick = {handleEditAvatarClick}></div>
          </div>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" onClick = {handleEditProfileClick} className="profile__edit-btn" aria-label="Кнопка изменения данных профиля"></button>
            </div>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add-btn" onClick = {handleAddPlaceClick} aria-label="Кнопка добавления новой карточки"></button>
      </section>
        
      <section className="elements">
        {cards?.map(card => {
            return (
              <Card 
                card={card} 
                key={card._id} 
                onCardLike={handleCardLike} 
                onImageClick={handleCardClick} 
                onCardDelete={handleRemoveCardClick} 
              />
            )
          })
        }
      </section>
    </main>
  )
}

export default Main