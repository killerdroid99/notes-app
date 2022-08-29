import { useState } from "react"
import { trpc } from "../utils/trpc"
import UpdateNoteForm from "./UpdateNoteForm"

interface NoteProps {
  Id: string
  title: string
  description?: string | null
  priority?: "high" | "low" | "medium" | string
}

function Note({ Id, title, description, priority }: NoteProps) {
  const { mutate } = trpc.useMutation(["notes.delete-note"])
  const [edit, setEdit] = useState(false)
  const [info, setInfo] = useState(false)
  return (
    <div className="Note p-4 w-full h-auto max-w-2xl bg-zinc-900 grid grid-cols-2 group relative">
      <div className="absolute text-xxs font-bold bg-gray-50/10 py-px top-0 right-[36%] sm:right-[42%] w-fit rounded-bl-lg rounded-br-lg xl:opacity-0 group-hover:opacity-100 transition-opacity ease-in select-none">
        <span
          className="hover:text-red-400 cursor-pointer transition-colors ease-in px-2 border-r border-white border-collapse"
          onPointerDown={() => {
            window.confirm("Delete this note?") && mutate({ id: Id })
          }}
        >
          DELETE
        </span>
        <span
          className="hover:text-amber-500 cursor-pointer transition-colors ease-in px-2 border-l border-white border-collapse"
          onPointerDown={() => setEdit(!edit)}
        >
          EDIT
        </span>
      </div>
      <div
        className={`absolute h-full block inset-0 w-1
          ${
            priority === "high"
              ? "bg-amber-500"
              : priority === "medium"
              ? "bg-blue-500"
              : "bg-green-500"
          }
        `}
      />
      <h2 className="w-fit">{title}</h2>
      <button
        className={`w-fit justify-self-end hover:bg-accent/20 rounded-full px-2 ring-[2px] ring-accent/20 hover:ring-accent text-xxs text-right ${
          info && "bg-accent/20"
        }`}
        onPointerDown={() => setInfo(!info)}
      >
        More Info
      </button>
      {info && (
        <div className="col-span-2 text-slate-400 bg-slate-900/20 p-3 border-l-4 border-b border-r-4 border-teal-900 w-full h-auto mt-2 rounded-b-xl">
          <p>
            <span
              className={`${
                priority === "high"
                  ? "text-amber-500"
                  : priority === "medium"
                  ? "text-blue-500"
                  : "text-green-500"
              } font-bold`}
            >
              {priority}
            </span>{" "}
            priority
          </p>
          <p className="text-white mt-2">
            {description ? <>{description}</> : <>No description provided 😢</>}
          </p>
        </div>
      )}
      <UpdateNoteForm
        Id={Id}
        old_title={title}
        old_description={description ?? ""}
        old_priority={priority as string}
        visible={edit}
        setVisible={setEdit}
      />
    </div>
  )
}

export default Note
