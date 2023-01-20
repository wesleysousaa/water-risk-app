import { createContext, useContext, useState } from "react"


const AlagamentosContext = createContext()

export const useAlagamentos = () => {
    return useContext(AlagamentosContext)
}

export const AlagamentosContextProvider = ({ children }) => {

    const [alagamentos, setAlagamentos] = useState([])

    return (
        <AlagamentosContext.Provider value={{ alagamentos, setAlagamentos }}>
            {children}
        </AlagamentosContext.Provider>
    )
}
