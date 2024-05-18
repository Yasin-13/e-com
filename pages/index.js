import Image from "next/image";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons"
import { useSession, signIn, signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"
import Google from "next-auth/providers/google";

export default function Home() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }


  return <>
  <div className="flex flex-col min-h-screen justify-center items-center max-w-4xl mx-auto">
    <h1 className="text-4xl text-bold max-w-lg text-center">welcome to Admin side Website</h1>
    <p className="font-medium my-2">admin priveelge/account required to access</p>
    <Button onClick={() => signIn('google')}>
      <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Login with Email 
    </Button>

    
  </div>

  </>
}
