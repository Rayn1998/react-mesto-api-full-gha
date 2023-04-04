class Api {
    constructor(options) {
        this._address = options.baseUrl;
    }
    
    _getResponseData(res) {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`); 
        } else {
          return res.json()
        }
    }

    _getToken() {
        return localStorage.getItem('jwt');
    }

    async _request(url, options) {
      return await fetch(url, options).then(this._getResponseData)
    }

    async like(cardId) {
      return await this._request(`${this._address}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
            authorization: this._getToken(),
            "Content-Type": "application/json"
        },
      })
    }

    async deleteLike(cardId) {
      return await this._request(`${this._address}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
            authorization: this._getToken(),
            "Content-Type": "application/json"
        },
      })
    }

    // USER
    getUserData() {
        return this._request(`${this._address}/users/me`, {
          method: 'GET',
          headers: {
            authorization: this._getToken(),
            "Content-Type": "application/json"
        },
      })
    }

    getCardsData() {
      return this._request(`${this._address}/cards`, {
        method: 'GET',
        headers: {
            authorization: this._getToken(),
            "Content-Type": "application/json"
        },
      })
    }

    sendData(newData) {
      return this._request(`${this._address}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._getToken(),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: newData.name,
            about: newData.about
        })
      })
    }

    editAvatar(link) {
      return this._request(`${this._address}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: this._getToken(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            avatar: link.avatar,
        })
      })
    }

    newCard(cardData) {
      return this._request(`${this._address}/cards`, {
        method: 'POST',
        headers: {
            authorization: this._getToken(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            link: cardData.link,
            name: cardData.name,
        })
      })
    }

    deleteCard(cardId) {
      return this._request(`${this._address}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: this._getToken(),
            "Content-Type": "application/json"
        },
      })
    }
}

const api = new Api({
    baseUrl: process.env.NODE_ENV === 'production' ? 'https://api.bodolanov.nomoredomains.work' : 'http://127.0.0.1:3001',
})

export default api