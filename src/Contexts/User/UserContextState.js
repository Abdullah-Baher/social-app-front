import React, { useState } from 'react'
import UserContext from './UserContext'

const UserContextState = props => {
   
    const [ state, setState ] = useState({})

    const saveUser = (user) => setState(user);
   
    return (
        <UserContext.Provider value={{...state, saveUser}}>
            {props.children}
        </UserContext.Provider>
    )
}


export default UserContextState;