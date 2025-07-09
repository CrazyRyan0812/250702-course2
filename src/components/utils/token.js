import { STORAGE_KEY } from "../../constant"

const getToken = () => {
    return localStorage.getItem(STORAGE_KEY)
  }
  
  const setToken = (token) => {
    localStorage.setItem(STORAGE_KEY, token)
    return token
  }
  
export { getToken, setToken }
  