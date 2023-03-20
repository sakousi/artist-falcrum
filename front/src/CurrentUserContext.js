import React, { Component, createContext, useState } from 'react';

export const CurrentUserContext = createContext();

export default function CurrentUserProvider({children}){
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <CurrentUserContext.Provider 
            value={{ 
                currentUser, 
                setCurrentUser }}>
            {children}
        </CurrentUserContext.Provider>
    );
}
