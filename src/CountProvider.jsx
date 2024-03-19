import React, { createContext, useState, useContext } from 'react';

const CountContext = createContext();

export const CountProvider = ({ children }) => {
    const [count, setCount] = useState(0);

    const value = {
        count,
        setCount,
    };

    return (
        <CountContext.Provider value={value}>
            {children}
        </CountContext.Provider>
    );
};

export const useCount = () => useContext(CountContext);
