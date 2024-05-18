import "@/styles/globals.css";

import { SessionProvider } from "next-auth/react"

import { Inter, Poppins } from "next/font/google";

const inter = Poppins({ subsets: ["latin"] ,weight:'400'});

export default function App({ Component, pageProps : { session, ...pageProps }}) {
  return <main className={`${inter.className}`}>
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  </main>
}
