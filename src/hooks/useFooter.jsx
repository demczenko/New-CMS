import { useContext } from "react"
import { FooterContext } from "../context/footerProvider"




export const useFooter = () => {
  const context = useContext(FooterContext)

  if (!context) {
    throw new Error("Context cannot be used without provider.")
  }

  return context
}