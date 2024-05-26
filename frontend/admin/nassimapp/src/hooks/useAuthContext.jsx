import { AuthContext } from "./Auth"
import { useContext } from "react"

export const useAuthContext = () => {
  return useContext(AuthContext) ?? 
    new Error('useAuthContext must be used inside an AuthContextProvider');
}
