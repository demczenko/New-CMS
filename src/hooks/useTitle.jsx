import { useContext } from "react"
import { TitleContext } from "../context/titleProvider"




export const useTitle = () => {
  const context = useContext(TitleContext)

  if (!context) {
    throw new Error("Context cannot be used without provider.")
  }

  return context
}