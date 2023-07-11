export const BASE_URL = 'https://api.nomoreparties.co';

function getResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

function getInitialFilms() {
  return fetch(`${BASE_URL}/beatfilm-movies`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    getResponse(res);
  });
}

export default getInitialFilms;
