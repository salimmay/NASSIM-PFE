import { CategoriesContext } from "./MenuContext"
import { useContext } from "react"

export const useCategoriesContext = () => {
  const context = useContext(CategoriesContext)

  if(!context) {
    throw Error('useCategoriesContext must be used inside a CategoriesContextProvider')
  }

  return context
}