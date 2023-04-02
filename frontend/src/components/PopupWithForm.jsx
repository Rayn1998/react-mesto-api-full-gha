import React from 'react';

function PopupWithForm({name, isOpen, title, onClose, onSubmit, buttonText, children}) {
  return (
      <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
        <div className="popup__body">
          <div className="popup__content">
            <button 
              type="button" 
              className="popup__close-btn" 
              aria-label="Кнопка закрытия попапа"
              onClick={onClose}
            />
            <h2 className="popup__title">{title}</h2>
            <form className="popup__inputs" onSubmit={onSubmit} id={name} name={name}>
                {children}
                <button 
                    type="submit" 
                    className="popup__save-btn" 
                    id="popup_type_profile-save-btn"
                    aria-label="Кнопка отправки формы на сервер"
                >
                  {buttonText}           
                </button>
            </form>
          </div>
        </div>
      </div>
  )
}

export default PopupWithForm