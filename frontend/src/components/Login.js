import React, { useEffect } from 'react';
import InfoTooltip from './InfoTooltip';
import { authorize, checkToken } from '../utils/ApiAuth';

function Login(props) {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  function closeTooltipPopup() {
    setIsTooltipPopupOpen(false)
  }

  function onLogin(res) {
    localStorage.setItem("jwt", res.token)
    props.setLoggedIn(true)
    props.setEmail(email)
  }

  function handleEmail(e) {
    setEmail(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    authorize(email, password)
      .then((res) => {
        onLogin(res)
      })
      .catch((err) => {
        setIsTooltipPopupOpen(true)
        setErrorMessage(err)
        console.log(err)
      })
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            props.setLoggedIn(true)
            props.setEmail(res.email)
          }
        })
        .catch((err) => {
          setIsTooltipPopupOpen(true)
          setErrorMessage(err)
          console.log(err)
        });
    }
  }, []);

  return (
    <>
      <div className='enter'>
        <h2 className='enter__title'>Вход</h2>
        <form className='enter__form' onSubmit={handleSubmit}>
          <input
            className='enter__input'
            type='email'
            required
            placeholder="Email"
            onChange={handleEmail}
          />
          <input
            className='enter__input'
            type='password'
            required
            placeholder="Пароль"
            onChange={handlePassword}
          />
          <button className='enter__confirm' type='submit'>Войти</button>
        </form>
      </div>
      
      <InfoTooltip
        isOpen={isTooltipPopupOpen}
        onClose={closeTooltipPopup}
        errorMessage={errorMessage}
      />
    </>
  )
}

export default Login
