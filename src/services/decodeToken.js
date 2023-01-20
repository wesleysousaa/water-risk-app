const BASE_URL = 'https://waterriskapi.onrender.com/user/decode'

export const decodeToken = async(token) => {
    const data = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return await data.json()
}
