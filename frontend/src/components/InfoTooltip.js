import Register_ok from '../images/Register_ok.svg';
import Register_error from '../images/Register_error.svg';

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && 'popup_is-opened'}`}>
      <div className='popup__container'>
        <img className='popup__img-for-register'
          src={props.errorMessage ? Register_error : Register_ok}
          alt={props.errorMessage ? 'Что-то пошло не так! Попробуйте еще раз.' : 'Вы успешно зарегистрировались!'}
        ></img>
        <button className='popup__close' type='button' onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltip