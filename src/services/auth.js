const BASE_URL = 'https://waterriskapi.onrender.com/user/login'
// const BASE_URL = 'http://localhost:4000/user/login'

const auth = async (email, senha) => {
    const data = await fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify({email, senha}),
        headers: {
            'Content-Type': 'application/json'
        }
        
    })

    return await data.json()
}

export default auth