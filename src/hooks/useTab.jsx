import { useContext } from "react"
import { TabContext } from "../context/tabProvider"




export const useTab = () => {
  const context = useContext(TabContext)

  if (!context) {
    throw new Error("Context cannot be used without provider.")
  }

  return context
}