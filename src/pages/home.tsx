import { NextPage } from "next"
import { useSession } from "next-auth/react"
import Head from "next/head"
import AddNoteForm from "../components/AddNoteForm"
import Navbar from "../components/Navbar"
import Note from "../components/Note"
import { AnimatePresence } from "framer-motion"
import { trpc } from "../utils/trpc"

const SignUp: NextPage = () => {
  const { data: session } = useSession()
  const notes = trpc.useQuery(["notes.get-notes"])

  if (session) {
    return (
      <div className="h-screen bg-primary bg-fixed text-white flex flex-col items-center overflow-y-auto">
        <Navbar />
        <Head>
          <title>Notes App | Home</title>
          <meta name="description" content="A simple notes app" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        {notes.isLoading ? (
          <p className="mt-40 text-sm font-mono capitalize tracking-wider font-bold animate-bounce">
            🔃 loading notes...
          </p>
        ) : (
          <>
            <AddNoteForm />
            <div className="pt-20 pb-8 flex flex-col w-[80%] gap-8 items-center justify-center">
              <h1 className="text-lg font-qc font-extrabold" id="top">
                Your notes
              </h1>
              <AnimatePresence>
                {notes.data?.map((note) => (
                  <Note
                    title={note.title}
                    key={note.id}
                    Id={note.id}
                    priority={note.priority}
                    description={note?.description}
                  />
                ))}
              </AnimatePresence>
              {!notes.data?.length && (
                <p className="mt-40 text-sm font-mono capitalize tracking-wider font-bold">
                  No notes, click the `Add Note` button to add some
                </p>
              )}
            </div>
          </>
        )}
      </div>
    )
  }
  return (
    <div className="h-screen bg-primary bg-fixed text-white flex flex-col items-center overflow-y-auto">
      <Navbar />
      <Head>
        <title>Notes App | Home</title>
      </Head>
      <span className="mt-40 text-sm font-mono capitalize tracking-wider font-bold">
        📝 You are not logged in, log in to add some notes 📝
      </span>
    </div>
  )
}

export default SignUp
