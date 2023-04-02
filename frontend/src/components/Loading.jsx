import React from 'react';
import LoadingImg from '../images/loading.png';

function Loading({isOpen, onClose}) {
  return (
    <div className={`popup popup_type_loading ${isOpen && "popup_opened"}`}>
      <div className="popup__body">
        <div className="popup__content">
          <button
            type="button"
            className="popup__close-btn"
            aria-label="Кнопка закрытия попапа"
            onClick={onClose}
          />
          <div className="popup__auth-wrapper">
            <img className="popup__loading-img" src={LoadingImg} alt='Изображение после регистрации' />
            <p className='popup__auth-reg-text'>Loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;