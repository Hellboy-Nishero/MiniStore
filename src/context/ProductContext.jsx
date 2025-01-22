import React, { useState } from 'react'
import { createContext } from 'react'
export const ProductContext = createContext();

export const ProductProvider = ({children}) => {

    const [addedProducts, setAddedProducts] = useState([]);

    const [count, setCount] = useState(0);

    const [total, setTotal] = useState(0);

    return (
        <ProductContext.Provider value={{count, setCount, addedProducts, setAddedProducts, total, setTotal}}>
            {children}
        </ProductContext.Provider>
    )
}