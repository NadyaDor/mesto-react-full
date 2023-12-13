import logo from '../images/Logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
  function signOut() {
    localStorage.removeItem("jwt")
    props.setLoggedIn(false)
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип текущего проекта"/>
      <div className='header__container'>
        <div><Link to={props.link} onClick={signOut} className='header__link'>{props.text}</Link></div>
        <div className='header__email'>{props.email}</div>
      </div>
    </header>
  )
}

export default Header
