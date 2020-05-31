class API {
  constructor(link, token) {
    this.link = link;
    this.token = token;
  }

  // Можно лучше
  // Повторяющийся код разбора ответа сервера и возврата ошибки
  // можно вынести в отдельные методы класса и использовать их

  getUserInfo() {
    return fetch(`${this.link}/users/me`, {
      headers: {
        authorization: this.token
      }
    })
      .then((res) => {
        if (res.ok) return res.json();
        else return Promise.reject(`Ошибка: ${res.status}. Но Вы не отчаивайтесь.`);
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      })
  }

  getCards() {
    return fetch(`${this.link}/cards`, {
      headers: {
        authorization: this.token
      }
    })
      .then((res) => {
        if (res.ok) return res.json();
        else return Promise.reject(`Ошибка: ${res.status}. Но Вы не отчаивайтесь.`);
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      })
  }

  editProfile(person, job) {
    return fetch(`${this.link}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: person,
        about: job
      })
    })
      .then((res) => {
        if (res.ok) return res.json();
        else return Promise.reject(`Ошибка: ${res.status}. Но Вы не отчаивайтесь.`);
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      })
  }

  postCard(place, address) {
    return fetch(`${this.link}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: place,
        link: address
      })
    })
      .then((res) => {
        if (res.ok) return res.json();
        else return Promise.reject(`Ошибка: ${res.status}. Но Вы не отчаивайтесь.`);
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      })
  }

  deleteCard(id){
    return fetch(`${this.link}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.ok) return res.json();
      else return Promise.reject(`Ошибка: ${res.status}. Но Вы не отчаивайтесь.`);
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    })
  }
  

  like(id) {
    return fetch(`${this.link}/cards/like/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) return res.json();
        else return Promise.reject(`Ошибка: ${res.status}. Но Вы не отчаивайтесь.`);
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      })
  }

  dislike(id) {
    return fetch(`${this.link}/cards/like/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) return res.json();
        else return Promise.reject(`Ошибка: ${res.status}. Но Вы не отчаивайтесь.`);
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      })
  }

  changeAvatar(link) {
    return fetch(`${this.link}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then((res) => {
        if (res.ok) return res.json();
        else return Promise.reject(`Ошибка: ${res.status}. Но Вы не отчаивайтесь.`);
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      })
  }
}