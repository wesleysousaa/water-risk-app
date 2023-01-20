import { useState } from "react"

// Hooks
import { useAuthContext } from "./useAuthContext"

// Services
import auth from "../services/auth"
import { decodeToken } from '../services/decodeToken'
import { register } from "../services/register"

export const useAuth = () => {

    const { setUser, user } = useAuthContext()
    const [loading, setLoading] = useState(false)

    const Login = async (email, senha) => {
        setLoading(true)
        const { token } = await auth(email, senha)

        if (token) {
            const user = (await decodeToken(token)).user
            localStorage.setItem('@Auth:token', token)
            setUser(user)
            setLoading(false)
            return false
        }
        setLoading(false)
        return true

    }

    const registerUser = async (nome, email, senha) => {
        setLoading(true)
        const response = await register(nome, email, senha)
        
        if (response.auth) {
            const user = await decodeToken(response.token)
            localStorage.setItem('@Auth:token', response.token)
            setUser(user)
            setLoading(false)
            return false
        }
        setLoading(false)
        return true

    }

    const checkToken = async () => {
        const token = localStorage.getItem('@Auth:token')
        if (!user) {
            if (token) {
                const user = (await decodeToken(token)).user
                if (user.idusuario) {
                    setUser(user)
                    return
                }
            }
        }
    }

    const exit = async () => {
        setUser(null)
        localStorage.removeItem('@Auth:token')
    }

    return {
        Login,
        loading,
        checkToken,
        registerUser,
        exit

    }

}

