import React from 'react';
import PopupWithForm from './PopupWithForm';

const RemoveCardPopup = ({isOpen, card, isLoading, onClose, onSubmit}) => {
    function handleClose() {
        onClose()
    }

    function handleDelete(e) {
        e.preventDefault()

        onSubmit(card._id)
    }

    return (
        <PopupWithForm 
            name='remove-card-form'
            isOpen={isOpen}
            onClose={handleClose}
            onSubmit={handleDelete}
            title='Удалить карточку?'
            buttonText={isLoading ? 'Удаляю...' : 'Удалить'}
        />
    );
}

export default RemoveCardPopup;
