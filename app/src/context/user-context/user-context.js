import React, { useState } from 'react';
export const UserContext = React.createContext({
    User: {

    },
})

export default props => {
   const [user, setUser] = useState({})
    return (
        <UserContext.Provider value={{user : user}}>
            {props.children}
        </UserContext.Provider>
    )
}