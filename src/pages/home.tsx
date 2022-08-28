import { NextPage } from "next"
import { useSession } from "next-auth/react"
import Head from "next/head"
import AddNoteForm from "../components/AddNoteForm"
import Navbar from "../components/Navbar"
import Note from "../components/Note"

const SignUp: NextPage = () => {
  const { data: session } = useSession()

  return (
    <div className="h-screen bg-primary bg-fixed text-white grid place-items-center overflow-y-auto">
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
            <Note title="dlasd" />
            <Note title="dlasd" />
            <Note title="dlasd" priority="high" />
            <Note title="dlasd" priority="medium" />
            <Note title="dlasd" />
            <Note title="dlasd" priority="high" />
            <Note title="dlasd" priority="medium" />
            <Note title="dlasd" />
            <Note title="dlasd" priority="high" />
            <Note title="dlasd" priority="medium" />
            <Note title="dlasd" />
            <Note title="dlasd" priority="high" />
            <Note title="dlasd" priority="medium" />
            <Note title="dlasd" />
            <Note title="dlasd" priority="high" />
            <Note title="dlasd" priority="medium" />
            <Note title="dlasd" />
            <Note title="dlasd" priority="high" />
            <Note title="dlasd" priority="medium" />
            <Note title="dlasd" />
            <Note title="dlasd" priority="high" />
            <Note title="dlasd" priority="medium" />
            <Note title="dlasd" />
            <Note title="dlasd" priority="high" />
            <Note title="dlasd" priority="medium" />
            <Note title="dlasd" />
            <Note title="dlasd" priority="high" />
            <Note title="dlasd" priority="medium" />
            <Note title="dlasd" />
            <Note title="dlasd" priority="high" />
            <Note title="dlasd" priority="medium" />
            <Note title="dlasd" />
            <Note title="dlasd" priority="high" />
            <Note title="dlasd" priority="medium" />
          </div>
        </>
      ) : (
        <span>You are not logged in log in to add some notes</span>
      )}
    </div>
  )
}

export default SignUp
