import React, {useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({isOpen, onClose, onSubmit, isLoading}) => {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  function handleName(e) {
    setName(e.target.value)
  }

  function handleLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    onSubmit({
      name,
      link
    })
  }

  useEffect(() => {
    setName('')
    setLink('')
  }, [isOpen])

  return (
    <PopupWithForm 
      isOpen={isOpen}
      onSubmit={handleSubmit} 
      onClose={onClose} 
      name='add-place-form' 
      title='Новое место' 
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <div className="popup__divide-container">
        <input 
          name="name" 
          className="popup__input popup__input_type_title" 
          type="text" 
          placeholder="Название"
          id="popup__title" 
          required 
          minLength="2" 
          maxLength="30" 
          value={name}
          onChange={handleName}
        />
        <span className="popup__error popup__title-error"></span>
      </div>
      <div className="popup__divide-container">
        <input 
          name="link" 
          className="popup__input popup__input_type_link" 
          type="url"
          placeholder="Ссылка на картинку" 
          id="popup__link" 
          required 
          value={link}
          onChange={handleLink}
        />
        <span className="popup__error popup__link-error"></span>
      </div>
    </PopupWithForm>
  );
};

export default AddPlacePopup;