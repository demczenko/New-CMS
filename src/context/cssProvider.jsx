import { createContext, useState } from "react"



export const CssContext = createContext()

export const CssContextProvider = ({ children }) => {
  const [css, setCss] = useState([])

  return <CssContext.Provider value={[css, setCss]}>
    {children}
  </CssContext.Provider>
}

