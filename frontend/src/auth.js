export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3001' : 'https://api.bodolanov.nomoredomains.work';
// export const BASE_URL = 'http://127.0.0.1:3001';

export const register = async (password, email) => {
    const res = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "password": `${password}`,
            "email": `${email}`
        }),
    })
    return checkResponse(res)
}

export const authenticate = async (password, email) => {
    const res = await fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "password": `${password}`,
            "email": `${email}`
        })
    })

    return checkResponse(res)
}

export const checkToken = async jwt => {
    const res = await fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    })

    return checkResponse(res)
}

const checkResponse = res => res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`)