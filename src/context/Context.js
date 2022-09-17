import { createContext, useContext, useReducer } from "react";
import { useSelector } from "react-redux";
import { cartReducer, filterReducer } from "./Reducer";

const Cart = createContext();

const Context = ({children}) => {
    const products = useSelector(store => store.products.productList);
    console.log(products , 'ContextProduct')
    const [state , dispatchs] = useReducer(cartReducer, {
        products:products,
        cart:[],
        wishlist:[],
    })

    const [filterstate , filterDispatch ] = useReducer(filterReducer , {
        byRating:0,
        searchQuery:'',
    })
    return <Cart.Provider value={{state , dispatchs,filterstate,filterDispatch}} >{children}</Cart.Provider>
}

export default Context;

export const CartState = () => {
    return useContext(Cart)
}