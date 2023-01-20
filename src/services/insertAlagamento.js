const BASE_URL = 'https://waterriskapi.onrender.com/alagamento/insertalagamento'
// const BASE_URL = 'http://localhost:4000/alagamento/insertalagamento'

const insertAlagamento = async (token, alaObj) => {
    const data = await fetch(BASE_URL, {
        method: 'POST',
        body:  alaObj,
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    return data
}

export default insertAlagamento