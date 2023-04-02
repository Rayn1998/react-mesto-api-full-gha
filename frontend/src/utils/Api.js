class Api {
    constructor(options) {
        this._address = options.baseUrl;
        this._cohort = options.cohort;
        this._headers = options.headers;
    }
    
    _getResponseData(res) {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`); 
        } else {
          return res.json()
        }
    }

    _request(url, options) {
      return fetch(url, options).then(this._getResponseData)
    }

    like(cardId) {
      return this._request(`${this._address}/${this._cohort}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
    }

    deleteLike(cardData) {
      return this._request(`${this._address}/${this._cohort}/cards/${cardData._id}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      })
    }

    // USER
    getUserData() {
        return this._request(`${this._address}/${this._cohort}/users/me`, {
          method: 'GET',
          headers: this._headers,
      })
    }

    getCardsData() {
      return this._request(`${this._address}/${this._cohort}/cards`, {
        method: 'GET',
        headers: this._headers,
      })
    }

    sendData(newData) {
      return this._request(`${this._address}/${this._cohort}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            name: newData.name,
            about: newData.about
        })
      })
    }

    editAvatar(link) {
      return this._request(`${this._address}/${this._cohort}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            avatar: link.avatar,
        })
      })
    }

    newCard(cardData) {
      return this._request(`${this._address}/${this._cohort}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
            name: cardData.name,
            link: cardData.link,
        })
      })
    }

    deleteCard(cardId) {
      return this._request(`${this._address}/${this._cohort}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
    }
}

const api = new Api ({
    baseUrl: 'https://mesto.nomoreparties.co/v1',
    cohort: 'cohort-50',
    headers: {
      authorization: '7cf72c5a-6762-41bc-abd0-7773b56f9a95',
      'Content-Type': 'application/json'
    }
})

export default api