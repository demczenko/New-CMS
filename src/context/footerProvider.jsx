import { createContext, useState } from "react"



export const FooterContext = createContext()

export const FooterContextProvider = ({ children }) => {
  const [footer, setFooter] = useState('')

  return <FooterContext.Provider value={[footer, setFooter]}>
    {children}
  </FooterContext.Provider>
}

