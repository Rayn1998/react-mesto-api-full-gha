import React, { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function handleName(e) {
    setName(e.target.value)
  }

  function handleDescription(e) {
    setDescription(e.target.value)
  }

  function handleClose() {
    onClose()
  }

  function handleSubmit(e) {
    e.preventDefault()

    onUpdateUser({
      name,
      about: description,
    })
  }

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, isOpen])

  return (
    <PopupWithForm 
      isOpen={isOpen}
      onClose={handleClose} 
      onSubmit={handleSubmit} 
      name='edit-profile-form' 
      title='Редактировать профиль' 
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <div className="popup__divide-container">
        <input
          name="name"
          className="popup__input popup__input_type_name"
          type="text" placeholder="Имя"
          id="popup__name"
          required
          minLength="2"
          maxLength="40"
          value={name || ''}
          onChange={handleName}
        />
        <span className="popup__error popup__name-error"></span>
      </div>
      <div className="popup__divide-container">
        <input
          name="about"
          className="popup__input popup__input_type_profession"
          type="text"
          placeholder="О себе"
          id="popup__profession"
          required
          minLength="2"
          maxLength="200"
          value={description || ''}
          onChange={handleDescription}
        />
        <span className="popup__error popup__profession-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;