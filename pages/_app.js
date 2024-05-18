import "@/styles/globals.css";


import { Inter, Poppins } from "next/font/google";

const inter = Poppins({ subsets: ["latin"] ,weight:'400'});

export default function App({ Component, pageProps }) {
  return <main className={`${inter.className}`}>
    <Component {...pageProps} />
  </main>
}
