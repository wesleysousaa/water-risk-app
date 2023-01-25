const BASE_URL = 'https://waterriskapi.onrender.com/alagamento/fetchall'
// const BASE_URL = 'http://localhost:4000/alagamento/fetchall'

const fetchAlagamentos = async (token) => {
    const data = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    }).then(e => {
        return e
    })
    return await data.json()
}

export default fetchAlagamentos