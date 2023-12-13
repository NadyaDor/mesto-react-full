class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl; // Устанавливаем базовый адрес для API
  }
  
  _checkResponse(res) { // Функция для проверки ответа от сервера
    if (res.ok) { // Если ответ успешен (код 200)
      return res.json(); // Преобразовываем ответ в формат JSON и возвращаем его
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`)); // В случае ошибки отклоняем промис с сообщением об ошибке
  }
  
  getUserInfo() { // Метод для получения информации о пользователе
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.jwt}`, // Передаем токен авторизации в заголовке запроса
        'Content-Type': 'application/json'
      },
    })
    .then(this._checkResponse); // Проверяем ответ с использованием функции _checkResponse
  }
  
  getInitialCards() { // Метод для получения списка карточек
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.jwt}`, // Передаем токен авторизации в заголовке запроса
        'Content-Type': 'application/json'
      },
    })
    .then(this._checkResponse); // Проверяем ответ с использованием функции _checkResponse
  }
  
  setUserInfo(data) { // Метод для обновления информации о пользователе
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.jwt}`, // Передаем токен авторизации в заголовке запроса
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // Передаем данные в теле запроса в формате JSON
    })
    .then(this._checkResponse); // Проверяем ответ с использованием функции _checkResponse
  }
  
  setUserAvatar(data) { // Метод для обновления аватара пользователя
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.jwt}`, // Передаем токен авторизации в заголовке запроса
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar // Передаем новый аватар в теле запроса в формате JSON
      })
    })
    .then(this._checkResponse); // Проверяем ответ с использованием функции _checkResponse
  }
  
  addCard(data) { // Метод для отправки запроса на добавление новой карточки
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.jwt}`, // Передаем токен авторизации в заголовке запроса
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // Передаем данные новой карточки в теле запроса в формате JSON
    })
    .then(this._checkResponse); // Проверяем ответ с использованием функции _checkResponse
  }
  
  deleteMyCard(cardId) { // Метод для отправки запроса на удаление карточки
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.jwt}`, // Передаем токен авторизации в заголовке запроса
        'Content-Type': 'application/json'
      },
    })
    .then(this._checkResponse); // Проверяем ответ с использованием функции _checkResponse
  }

  changeLikeCardStatus(cardId, isLiked) { // Метод для изменения статуса лайка карточки
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE", // Используем PUT для установки лайка и DELETE для удаления лайка
      headers: {
        authorization: `Bearer ${localStorage.jwt}`, // Передаем токен авторизации в заголовке запроса
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse); // Проверяем ответ с использованием функции _checkResponse
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto18.nomoredomainsrocks.ru', // Создаем экземпляр класса с указанием базового адреса API
})

export default api; // Экспортируем экземпляр класса для использования в других частях приложения