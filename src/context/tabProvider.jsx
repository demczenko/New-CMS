import { createContext, useState } from "react"



export const TabContext = createContext()

export const TabContextProvider = ({ children }) => {
  const [tabs, setTabs] = useState([])

  return <TabContext.Provider value={[tabs, setTabs]}>
    {children}
  </TabContext.Provider>
}

