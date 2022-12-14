import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"

function Navbar() {
  const { data: session } = useSession()
  return (
    <nav className="fixed top-0 w-full bg-zinc-900 bg-opacity-50 backdrop-blur-sm p-2 px-4 lg:px-[15vw] flex items-center justify-between font-qc z-10 text-white">
      <div className=" text-base font-bold tracking-wider">
        <h1 className="text-accent">
          Notes
          <span className="text-white ml-1">App</span>
        </h1>
      </div>

      {/* nav-links/buttons */}
      {!session && (
        <div className="space-x-2">
          <button
            className="bg-primary py-1 text-xxs font-bold capitalize px-3 rounded hover:text-accent hover:bg-neutral-800 transition-colors ease-in"
            onClick={() => signIn()}
          >
            SIGN IN
          </button>
        </div>
      )}

      {session && (
        <div className="space-x-4 flex items-center">
          <div className="flex items-center space-x-1">
            {session.user && (
              <Image
                src={session.user?.image as string}
                alt={session.user?.name as string}
                width={25}
                height={25}
                priority
                className="rounded-full select-none"
              />
            )}
            <span
              className="text-accent text-xxs font-bold"
              title={session.user?.name as string}
            >
              {session.user?.name}
            </span>
          </div>
          <button
            className="bg-red-500 py-1 text-xxs font-bold capitalize px-3 rounded hover:bg-red-700 backdrop-blur-md transition-colors ease-in"
            onClick={() => signOut()}
          >
            SIGN OUT
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
