import "@/styles/index.css";
import type { AppProps } from "next/app";
import { Nunito } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { CartContext } from "@/Context/cartContext";
import { UserContext } from "@/Context/userContext";
import { useState } from "react";
import { Books } from "../interfaces";

const nunito = Nunito({ subsets: ["latin"] });

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [cartItems,setcartItems]=useState(new Map<string, { detail: { name: string }; quantity: number }>())
  const [userDetails,setUserDetails] = useState()
 
  return (
    <main className={nunito.className}>
      <SessionProvider session={session}>
        <ToastContainer />
        <UserContext.Provider value={{userDetails,setUserDetails}}>
        <CartContext.Provider value={{ cartItems, setcartItems }}>
          <Component {...pageProps} />
        </CartContext.Provider>
        </UserContext.Provider>
      </SessionProvider>
    </main>
  );
}

export default MyApp;
