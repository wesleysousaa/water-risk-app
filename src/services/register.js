const BASE_URL = 'https://waterriskapi.onrender.com/user/register'

export const register = async (nome, email, senha) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify({nome, email, senha}),
        headers: {
            'Content-Type' : 'application/json'
        }
    })

    return await response.json()
}
