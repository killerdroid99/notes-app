import { NextPage } from "next"
import { useSession } from "next-auth/react"
import Head from "next/head"
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
        <div className="pt-20 flex flex-col w-[80%] gap-8">
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
      ) : (
        <span>You are not logged in log in to add some notes</span>
      )}
    </div>
  )
}

export default SignUp
