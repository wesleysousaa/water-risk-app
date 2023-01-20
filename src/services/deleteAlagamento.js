// const BASE_URL = 'http://localhost:4000/alagamento/delete/'
const BASE_URL = 'https://waterriskapi.onrender.com/alagamento/delete/'

export const deleteAlagamento = async (id, token) => {
    const response = await fetch(`${BASE_URL}${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    })

    return await response.json()
}

