import React, { createContext, useState, useEffect } from 'react'
import { getCurrentUser } from "./services/auth"

export const Context = createContext()

function ContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const ctxUser = loginUser => setUser(loginUser)
  const clearctxUser = () => setUser(null)

  useEffect(() => {
    async function userdata() {
      const { user } = await getCurrentUser()
      setUser(user)
    }
    console.log(user)
    userdata()
  }, [])

  return (
    <Context.Provider value={{
      user,
      ctxUser,
      clearctxUser
    }}> 
      {children}
    </Context.Provider>
  )
}

export default ContextProvider
