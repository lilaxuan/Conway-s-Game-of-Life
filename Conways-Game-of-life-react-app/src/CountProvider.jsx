import React, { createContext, useContext } from 'react';

// Create Context
const CountContext = createContext();

// Custom hook to use the context
export function CountProvider() {
    return useContext(CountContext);
}

export { CountContext };

// import React, { createContext, useState, useContext } from 'react';

// const CountContext = createContext();

// export const CountProvider = ({ children, initialCount }) => {
//     // const [count, setCount] = useState(initialCount);
//     const [count, setCount] = useState(initialCount);


//     // // Functions to increment and decrement the count
//     // const incrementCount = () => setCount(prevCount => prevCount + 1);
//     // const decrementCount = () => setCount(prevCount => prevCount - 1);

//     // return (
//     //     <CountContext.Provider value={{ count, incrementCount, decrementCount }}>
//     //         {children}
//     //     </CountContext.Provider>
//     // );
//     return (
//         <CountContext.Provider value={{ count, initialCount, setCount }}>
//             {children}
//         </CountContext.Provider>
//     );
// };

// // Custom hook to use the count context
// export const useCount = () => useContext(CountContext);
