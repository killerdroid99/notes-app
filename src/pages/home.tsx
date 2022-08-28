import { NextPage } from "next"
import { useSession } from "next-auth/react"
import Head from "next/head"
import AddNoteForm from "../components/AddNoteForm"
import Navbar from "../components/Navbar"
import Note from "../components/Note"
import { trpc } from "../utils/trpc"

const SignUp: NextPage = () => {
  const { data: session } = useSession()
  const notes = trpc.useQuery(["notes.get-notes"])

  return (
    <div className="h-screen bg-primary bg-fixed text-white flex flex-col items-center overflow-y-auto">
      <Navbar />
      <Head>
        <title>Notes App | Home</title>
      </Head>
      {session ? (
        <>
          {/* <a
            className="fixed z-10 right-[5vw] lg:right-[20vw] bottom-4"
            href="#top"
          >
            Back to top
          </a> */}
          <AddNoteForm />
          <div className="pt-20 flex flex-col w-[80%] gap-8 items-center justify-center">
            <h1 className="text-4xl font-qc font-extrabold" id="top">
              Your notes
            </h1>
            {notes.data?.map((note) => (
              <Note title={note.title} key={note.id} priority={note.priority} />
            ))}
          </div>
        </>
      ) : (
        <span>You are not logged in log in to add some notes</span>
      )}
    </div>
  )
}

export default SignUp
