import { useContext } from "react"
import { ValueContext } from "../context/valueProvider"




export const useValue = () => {
  const context = useContext(ValueContext)

  if (!context) {
    throw new Error("Context cannot be used without provider.")
  }

  return context
}