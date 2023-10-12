import { useContext } from "react"
import { HeaderContext } from "../context/headerProvider"




export const useHeader = () => {
  const context = useContext(HeaderContext)

  if (!context) {
    throw new Error("Context cannot be used without provider.")
  }

  return context
}