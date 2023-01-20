import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"


export const useAuthContext = () => {

    const auth = useContext(AuthContext)
    return auth

}