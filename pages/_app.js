//React Imports
import {useState} from "react";
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

function MyApp({ Component, pageProps }) {

    const queryClient = new QueryClient()

  return (
      <QueryClientProvider client={queryClient}>
          <Toaster   position="bottom-right"
                     reverseOrder={false}/>
          <Header/>
          <Component {...pageProps} />
          <ReactQueryDevtools />
      </QueryClientProvider>)
}

export default MyApp
