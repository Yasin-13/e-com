import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { useSession, signIn, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: session } = useSession();
  
  if (session) {
    return (
      <>
        <header>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Welcome Back, {session.user.name}
                </h1>
                <p className="mt-1.5 text-sm text-gray-500">Let&apos;s write a new blog post</p>
              </div>

              <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                <button
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
                  type="button"
                >
                  <span className="text-sm font-medium"> View Website </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </button>

                <button
                  className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                  type="button"
                >
                  Create Post
                </button>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen justify-center items-center max-w-4xl mx-auto">
      <h1 className="text-4xl text-bold max-w-lg text-center">Welcome To Admin Side Website</h1>
      <p className="font-medium my-2">Admin privilege/account required to access</p>
      <Button onClick={() => signIn('google')}>
        <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Login with Email
      </Button>
    </div>
  );
}
