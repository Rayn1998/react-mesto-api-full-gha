import React, { useState, useEffect, useCallback } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import "../pages/index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import RemoveCardPopup from "./RemoveCardPopup";

import * as auth from '../auth';
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoToolTip from "./InfoToolTip";
import Loading from "./Loading";
import PageNotFound from "./PageNotFound";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isRemoveCardPopupOpen, setIsRemoveCardPopupOpen] = useState(false);
  const [isInfoToolTipPopup, setIsInfoToolTipPopup] = useState(false);
  const [isLoadingPopupOpen, setIsLoadingPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterOk, setIsRegisterOk] = useState(false)

  const [loggedIn, setIsLoggedIn] = useState(false);

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isImagePopupOpen ||
    isRemoveCardPopupOpen ||
    isInfoToolTipPopup;

  const setUserState = useCallback((data, email) => {
    setIsLoadingPopupOpen(true)
    localStorage.setItem('jwt', data)
    getUserData()
      .then((userData) => setCurrentUser({ ...currentUser, ...userData, email }))
      .catch((err) => console.log(err));

    getCardsData()
      .then((cardsData) => setCards(cardsData))
      .catch((err) => console.log(err));
    setIsLoadingPopupOpen(false)
  }, [])

  const checkToken = useCallback(async () => {
    try {
      setIsLoadingPopupOpen(true)

      const jwt = localStorage.getItem('jwt')
      const user = await auth.checkToken(jwt)
      const email = user.data.email
      setUserState(jwt, email)

      setIsLoggedIn(true)
    } catch { 
      throw new Error('Invalid user')
    }
    finally {
      setIsLoadingPopupOpen(false)
    }
  }, [])

  const authenticate = useCallback(async (password, email) => {
    localStorage.setItem('email', email)
    setIsLoadingPopupOpen(true)
    try {
      const data = await auth.authenticate(password, email)
      console.log(data)
      if (data.token) {
        setUserState(data.token, email)
        setIsLoggedIn(true)
      }
    } catch {
      setIsInfoToolTipPopup(true)
    }
    finally { setIsLoadingPopupOpen(false) }
  }, [])

  const register = useCallback(async (password, email) => {
    setIsLoadingPopupOpen(true)
    try {
      const data = await auth.register(password, email)
      if (data) {
        setIsRegisterOk(true)
        setIsLoadingPopupOpen(false)
        setIsInfoToolTipPopup(true)
      }
    } catch {
      setIsLoadingPopupOpen(false)
      setIsInfoToolTipPopup(true)
      throw new Error('Failed to register')
    }
  }, [])

  const logOut = useCallback(() => {
    localStorage.removeItem('jwt')
    setIsLoggedIn(false)
    setCurrentUser({})
    setIsRegisterOk(false)
  })

  // Функции запросов на сервер
  async function getUserData() {
    const userData = await api.getUserData()
    return userData
  }

  async function getCardsData() {
    const cards = await api.getCardsData()
    return cards
  }

  // Функции для работы с карточками
  function likeCard(data) {
      setCards((state) =>
        state.map((c) => (c._id === data._id ? data : c))
      )
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    isLiked
      ? api
        .deleteLike(card)
        .then(likeCard)
        .catch((err) => console.log(err))
      : api
        .like(card._id)
        .then(likeCard)
        .catch((err) => console.log(err));
  }

  function handleCardDelete(cardId) {
    setIsLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddCard(newData) {
    setIsLoading(true);
    api
      .newCard(newData)
      .then((card) => setCards([card, ...cards]))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  // Функции попапов
  function handleCardClick(e) {
    setSelectedCard(e.target);
    setIsImagePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleRemoveCardClick(card) {
    setSelectedCard(card);
    setIsRemoveCardPopupOpen(!isRemoveCardPopupOpen);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsRemoveCardPopupOpen(false);
    setSelectedCard({});
    setIsLoadingPopupOpen(false)
  }

  function closeInfo() {
    setIsInfoToolTipPopup(false);
    setTimeout(() => {
      setIsRegisterOk(false)
    }, 1000)
  }

  // Функции сабмитов
  function handleUpdateUser(newData) {
    setIsLoading(true);
    api
      .sendData(newData)
      .then((data) => setCurrentUser({ ...currentUser, ...data }))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(newData) {
    setIsLoading(true);
    api
      .editAvatar(newData)
      .then((data) => setCurrentUser({ ...currentUser, ...data }))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  // USEEFFECTS
  useEffect(() => {
    checkToken()
  }, [])

  useEffect(() => {
    function closeByEsc(e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", closeByEsc);
      return () => {
        document.removeEventListener("keydown", closeByEsc);
      };
    }
  }, [isOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="content">
        <Header loggedIn={loggedIn} onLogOut={logOut} />
        <Switch>
          <ProtectedRoute
            path='/main'
            loggedIn={loggedIn}
            props={{
              handleEditAvatarClick,
              handleEditProfileClick,
              handleAddPlaceClick,
              handleCardClick,
              handleRemoveCardClick,
              handleCardLike,
            }}
            cards={cards}
            component={Main}
          />
          <Route path='/sign-in'>
            <Login
              loggedIn={loggedIn}
              onSubmit={authenticate}
            />
          </Route>
          <Route path='/sign-up'>
            <Register
              onSubmit={register}
              registerOk={isRegisterOk}
            />
          </Route>
          <Route exact path='/'>
            {loggedIn ? <Redirect to='/main' /> : <Redirect to='/sign-in' />}
          </Route>
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
        <Footer />

        {/* POPUPS */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          isLoading={isLoading}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          isLoading={isLoading}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isLoading={isLoading}
          onSubmit={handleAddCard}
          onClose={closeAllPopups}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <PopupWithForm name="card-remove-form" title="Вы уверены?" />
        <RemoveCardPopup
          isOpen={isRemoveCardPopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          card={selectedCard}
          onSubmit={handleCardDelete}
        />
        <InfoToolTip isOpen={isInfoToolTipPopup} onClose={closeInfo} registerOk={isRegisterOk} />
        <Loading isOpen={isLoadingPopupOpen} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
