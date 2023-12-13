import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('')

  const navigate = useNavigate();

  function handleEditAvatarClick() { setIsEditAvatarPopupOpen(true) };
  function handleEditProfileClick() { setIsEditProfilePopupOpen(true) };
  function handleAddPlaceClick() { setIsAddPlacePopupOpen(true) };
  function handleCardClick(card) {setSelectedCard(card)}

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({})
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch(console.error)
  }

  function handleCardDelete(card) {
    api.deleteMyCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
        closeAllPopups()
      }).catch(console.error)
  }

  function handleUpdateUser({ name, about }) {
    api.setUserInfo({ name, about })
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      }).catch(console.error)
  }

  function handleUpdateAvatar({ avatar }) {
    api.setUserAvatar({ avatar })
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      }).catch(console.error)
  }

  function handleAddPlace({ name, link }) {
    api.addCard({ name, link })
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      }).catch(console.error)
  }

  useEffect(() => {
    if (loggedIn){
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([info, cardsData]) => {
          setCurrentUser(info);
          setCards(cardsData);
        })
        .catch(console.error)
      navigate('/')
    }
  }, [loggedIn, navigate])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path='/sign-up' element={
            <div className='enter__container'>
              <Header link={'/sign-in'} text={'Войти'} />
              <Register />
            </div>
          } />
          <Route path='/sign-in' element={
            <div className='enter__container'>
              <Header link={'/sign-up'} text={'Регистрация'} />
              <Login setLoggedIn={setLoggedIn} setEmail={setEmail} />
            </div>
          } />
          <Route path='*' element={<Navigate to={loggedIn ? '/' : '/sign-in'} />} />
          <Route path='/' element={
            <ProtectedRoute loggedIn={loggedIn}>
                <Header setLoggedIn={setLoggedIn} email={email} link={'/sign-in'} text={<span style={{ color: '#A9A9A9' }}>Выйти</span>} />
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />
                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                />
                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                />
                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlace={handleAddPlace}
                />
                <ImagePopup
                  name="image"
                  card={selectedCard}
                  isOpen={Object.keys(selectedCard).length > 0}
                  onClose={closeAllPopups}
                />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
