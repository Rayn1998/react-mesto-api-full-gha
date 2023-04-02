import React from "react";
import registerOK from '../images/register-ok.png';
import registerBAD from '../images/register-bad.png';

const InfoToolTip = ({ isOpen, onClose, registerOk }) => {
  return (
    <div className={`popup popup_type_info-tool-tip ${isOpen && "popup_opened"}`}>
      <div className="popup__body">
        <div className="popup__content">
          <button
            type="button"
            className="popup__close-btn"
            aria-label="Кнопка закрытия попапа"
            onClick={onClose}
          />
          <div className="popup__auth-wrapper">
            <img className="popup__auth-reg-img" src={registerOk ? registerOK : registerBAD} alt='Изображение после регистрации' />
            <p className='popup__auth-reg-text'>{registerOk ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoToolTip;
