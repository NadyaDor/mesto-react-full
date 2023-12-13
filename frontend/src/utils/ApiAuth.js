// Определение базового адреса API
export const baseUrl = 'https://api.mesto18.nomoredomainsrocks.ru';

// Функция для проверки ответа от сервера
function checkResponse(res) {
  if (res.ok) { // Если ответ успешен (код 200)
    return res.json(); // Преобразовываем ответ в формат JSON и возвращаем его
  }
  return Promise.reject(new Error(`Ошибка: ${res.status}`)); // В случае ошибки отклоняем промис с сообщением об ошибке
}

// Метод для регистрации пользователя
export function register(email, password) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Устанавливаем заголовок Content-Type для указания формата данных
    },
    body: JSON.stringify({
      email, password, // Передаем данные для регистрации в теле запроса в формате JSON
    }),
  })
  .then(checkResponse); // Проверяем ответ с использованием функции checkResponse
}

// Метод для авторизации пользователя
export function authorize(email, password) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Устанавливаем заголовок Content-Type для указания формата данных
    },
    body: JSON.stringify({
      email, password, // Передаем данные для авторизации в теле запроса в формате JSON
    }),
  })
  .then(checkResponse); // Проверяем ответ с использованием функции checkResponse
}

// Метод для проверки валидности токена и получения email в шапку профиля
export function checkToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', // Устанавливаем заголовок Content-Type для указания формата данных
      'Authorization': `Bearer ${token}`, // Передаем токен авторизации в заголовке запроса
    },
  })
  .then(checkResponse); // Проверяем ответ с использованием функции checkResponse
}
