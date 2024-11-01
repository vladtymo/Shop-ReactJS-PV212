import { createContext, useState } from "react";

export const ProductsContext = createContext({
    // properties
    count: 0,
    // methods
    setCount: () => null,
    clear: () => null
});

export const ProductsProvider = ({ children }) => {

    const [count, setCount] = useState(0);
    const clear = () => setCount(0);

    const value = { count, setCount, clear };

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}