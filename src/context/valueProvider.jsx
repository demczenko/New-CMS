import { createContext, useState } from "react"






export const ValueContext = createContext()

export const ValueContextProvider = ({ children }) => {
  const [values, setValues] = useState([])

  return <ValueContext.Provider value={[values, setValues]}>
    {children}
  </ValueContext.Provider>
}

