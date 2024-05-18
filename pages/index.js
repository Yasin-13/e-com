import Image from "next/image";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons"
 
import { Button } from "@/components/ui/button"

export default function Home() {
  return <>
  <div className="flex flex-col min-h-screen justify-center items-center max-w-4xl mx-auto">
    <h1 className="text-4xl text-bold max-w-lg text-center">welcome to Admin side Website</h1>
    <p className="font-medium my-2">admin priveelge/account required to access</p>
    <Button>
      <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Login with Email
    </Button>

    
  </div>

  </>
}
