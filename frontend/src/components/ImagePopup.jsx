import React from 'react';

function ImagePopup({isOpen, card, onClose}) {
  return ( 
    <div className={`popup popup_type_picture ${isOpen && 'popup_opened'}`}>
      <div className="popup__body">
        <div className="popup__content-image">
          <button type="button" className="popup__close-btn" aria-label="Кнопка закрытия попапа" onClick={onClose} ></button>
          <img className="popup__picture" src={card.src} alt={card.alt} />
          <h2 className="popup__text">{card.alt}</h2>
        </div>
      </div>
    </div>
  )
}

export default ImagePopup