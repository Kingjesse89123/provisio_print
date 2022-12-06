//React Imports
import {createContext, useContext, useEffect, useState} from "react";
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

function MyApp({ Component, pageProps }) {

    const queryClient = new QueryClient()

    const [cartItems, setCartItems] = useState([])
    const [subtotal, setSubtotal] = useState(0)

  return (
      <QueryClientProvider client={queryClient}>
              <Toaster position="top-center"
                      reverseOrder={false}/>
          <Header/>
          <CartContext.Provider value={{cartItems, setCartItems, subtotal, setSubtotal}}>
              <Component {...pageProps} />
          </CartContext.Provider>

              <ReactQueryDevtools/>
      </QueryClientProvider>)
}

export default MyApp
