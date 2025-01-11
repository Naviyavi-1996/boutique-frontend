import React, { createContext, useState } from 'react'

export const loginResponseContext=createContext({})
export const editResponseContext=createContext({})
export const addResponseContext=createContext({})

function Contextshare({children}) {
  const[loginResponse,setLoginResponse]=useState(true)
  const[editResponse,setEditResponse]=useState([])
  const[addResponse,setAddResponse]=useState([])
  return (
    <>
    <loginResponseContext.Provider value={{loginResponse,setLoginResponse}}> 
                   <editResponseContext.Provider value={{editResponse, setEditResponse}}>
                     <addResponseContext.Provider value={{addResponse,setAddResponse}}>{children}</addResponseContext.Provider>
                   </editResponseContext.Provider>
                    </loginResponseContext.Provider>
    </>
   
  )
}
export default Contextshare

