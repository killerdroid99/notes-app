import { useState } from "react"
import { useQueryClient } from "react-query"
import { trpc } from "../utils/trpc"
import { motion, AnimatePresence } from "framer-motion"
import UpdateNoteForm from "./UpdateNoteForm"

interface NoteProps {
  Id: string
  title: string
  description?: string | null
  priority?: "high" | "low" | "medium" | string
}

function Note({ Id, title, description, priority }: NoteProps) {
  const qc = useQueryClient()
  const { mutate, isLoading } = trpc.useMutation(["notes.delete-note"], {
    onSuccess() {
      qc.invalidateQueries(["notes.get-notes"])
    },
  })
  const [edit, setEdit] = useState(false)
  const [info, setInfo] = useState(false)
  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      exit={{ scaleY: 0, opacity: 0 }}
      className="Note px-4 py-5 w-full max-w-2xl bg-zinc-900 grid grid-cols-2 relative"
    >
      <div className="absolute text-xxs font-bold bg-gray-50/10 py-px top-0 right-[36%] sm:right-[42%] w-fit rounded-b-lg select-none">
        <span
          className="hover:text-red-400 cursor-pointer transition-colors ease-in px-2 border-r border-white border-collapse"
          onPointerDown={() => {
            window.confirm("Delete this note?") && mutate({ id: Id })
          }}
        >
          {isLoading ? <>DELETING..</> : <>DELETE</>}
        </span>
        <span
          className={`hover:text-amber-500 cursor-pointer transition-colors ease-in px-2 border-l border-white border-collapse ${
            edit && "text-amber-500"
          }`}
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
      <h2 className="w-fit text-xs">{title}</h2>
      <button
        className={`w-fit justify-self-end hover:bg-accent/20 rounded-full px-2 ring-[2px] ring-accent/20 hover:ring-accent text-xxs text-right ${
          info && "bg-accent/20"
        }`}
        onPointerDown={() => setInfo(!info)}
      >
        More Info
      </button>
      <AnimatePresence>
        {info && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100%", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ stiffness: 50, duration: 0.25 }}
            key="desc"
            className="col-span-2 text-slate-400 bg-slate-900/20 p-3 border-l-4 border-b border-r-4 border-teal-900 w-full h-auto mt-2 rounded-b-xl"
          >
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
              {description ? (
                <>{description}</>
              ) : (
                <>No description provided 😢</>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <UpdateNoteForm
        Id={Id}
        old_title={title}
        old_description={description ?? ""}
        old_priority={priority as string}
        visible={edit}
        setVisible={setEdit}
      />
    </motion.div>
  )
}

export default Note
