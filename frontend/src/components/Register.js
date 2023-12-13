import React from 'react';
import { Link } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import { register } from '../utils/ApiAuth';

function Register() {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  function closeTooltipPopup() {
    setIsTooltipPopupOpen(false)
  }

  function handleEmail(e) {
    setEmail(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    register(email, password)
      .then(() => {
        setErrorMessage('')
      })
      .catch((err) => {
        setErrorMessage(err)
        console.log(err)
      })
      .finally(() => {
        setIsTooltipPopupOpen(true)
      })
  }

  return (
    <>
      <div className='enter'>
        <h2 className='enter__title'>Регистрация</h2>
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
          <button className='enter__confirm' type='submit'>Зарегистрироваться</button>
        </form>
        <p>Уже зарегистрированы?
          <Link className='enter__in-login' to='/sign-in'>Войти</Link>
        </p>
      </div>
      
      <InfoTooltip
        isOpen={isTooltipPopupOpen}
        onClose={closeTooltipPopup}
        errorMessage={errorMessage}
      />
    </>
  )
}

export default Register