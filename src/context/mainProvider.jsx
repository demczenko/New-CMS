import { createContext, useState } from "react"



export const MainContext = createContext()

export const MainContextProvider = ({ children }) => {
  const [main, setMain] = useState('')

  return <MainContext.Provider value={[main, setMain]}>
    {children}
  </MainContext.Provider>
}

