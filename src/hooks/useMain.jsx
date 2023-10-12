import { useContext } from "react"
import { MainContext } from "../context/mainProvider"




export const useMain = () => {
  const context = useContext(MainContext)

  if (!context) {
    throw new Error("Context cannot be used without provider.")
  }

  return context
}