// import React, { createContext, useContext } from 'react';

// // Create Context
// const CountContext = createContext();

// // Custom hook to use the context
// export function CountProvider() {
//     return useContext(CountContext);
// }

// export { CountContext };

import React, { createContext, useState, useContext } from 'react';

// Create a Context
const CountContext = createContext();

// Create a Provider Component
export const CountProvider = ({ children }) => {
    const [count, setCount] = useState(0);

    // The value that will be available to child components
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

// Create a custom hook to simplify the use of context
export const useCount = () => useContext(CountContext);
