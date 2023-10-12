import { createContext, useState } from "react"





export const TitleContext = createContext()

export const TitleContextProvider = ({ children }) => {
  const [titles, setTitles] = useState([])

  return <TitleContext.Provider value={[titles, setTitles]}>
    {children}
  </TitleContext.Provider>
}

