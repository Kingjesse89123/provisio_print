//React Imports
import {createContext, useContext, useEffect, useState, useRef} from "react";
//
import '../styles/globals.css'
//React Query Imports
import {ReactQueryDevtools} from "react-query/devtools";
import {QueryClientProvider, QueryClient} from "react-query";
//Toast Import
import {Toaster} from "react-hot-toast";
//Component Imports
import Header from "../components/Header";
import Footer from "../components/Footer";
import {CartContext} from "../components/CartContext";

import Freshchat from "../lib/freshchat";
import Script from "next/script";


function MyApp({ Component, pageProps }) {

    const queryClient = new QueryClient()

    const [cartItems, setCartItems] = useState([])

    const [subtotal, setSubtotal] = useState(0)

    const initialRender = useRef(true);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("cartItems"))) {
            const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
            setCartItems([...cartItems, ...storedCartItems]);
        }
    }, []);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

  return (
      <QueryClientProvider client={queryClient}>
              <Toaster position="top-center" reverseOrder={false}/>
          <Header/>
          <CartContext.Provider value={{cartItems, setCartItems, subtotal, setSubtotal}}>
              <Component {...pageProps} />
          </CartContext.Provider>
              <ReactQueryDevtools/>
                <Freshchat />
      </QueryClientProvider>)
}
export default MyApp
