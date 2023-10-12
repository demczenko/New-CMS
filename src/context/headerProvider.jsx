import { createContext, useState } from "react"



export const HeaderContext = createContext()

export const HeaderContextProvider = ({ children }) => {
  const [header, setHeader] = useState('')

  return <HeaderContext.Provider value={[header, setHeader]}>
    {children}
  </HeaderContext.Provider>
}

