import { useContext } from "react"
import { CssContext } from "../context/cssProvider"




export const useCss = () => {
  const context = useContext(CssContext)

  if (!context) {
    throw new Error("Context cannot be used without provider.")
  }

  return context
}