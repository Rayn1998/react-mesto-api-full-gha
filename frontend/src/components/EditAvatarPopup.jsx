import React, {useRef, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, isLoading, onClose, onUpdateAvatar}) {
  const avatar = useRef()

  function handleClose() {
    onClose()
  }

  function handleSubmit(e) {
    e.preventDefault()

    onUpdateAvatar({
      avatar: avatar.current.value
    })
  }

  useEffect(() => {
    avatar.current.value = ''
  }, [isOpen])

  return (
    <PopupWithForm 
      isOpen={isOpen} 
      onClose={handleClose} 
      onSubmit={handleSubmit} 
      name='avatar-edit-form' 
      title='Обновить аватар' 
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <div className="popup__divide-container">
        <input 
          name="avatar" 
          className="popup__input popup__input_type_link" 
          type="url"
          placeholder="Ссылка на картинку"
          id="popup__link-avatar" 
          required 
          ref={avatar}
        />
        <span className="popup__error popup__link-avatar-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup