import { useId, useState } from "react"
import { useQueryClient } from "react-query"
import { trpc } from "../utils/trpc"

function AddNoteForm() {
  const titleId = useId()
  const descId = useId()
  const priorityId = useId()
  const [minimize, setMinimize] = useState(true)
  const { mutate, error } = trpc.useMutation(["notes.add-note"], {
    onSuccess() {
      qc.invalidateQueries(["notes.get-notes"])
      setinput({
        title: "",
        description: "",
        priority: "",
      })
      setMinimize(true)
    },
  })
  const [input, setinput] = useState({
    title: "",
    description: "",
    priority: "",
  })
  const qc = useQueryClient()

  return (
    <div className="fixed z-10 right-[5vw] lg:right-[20vw] top-20 bg-zinc-900 p-2 bg-opacity-70 backdrop-blur-md ring-2 ring-primary">
      {minimize && (
        <p className="cursor-pointer" onClick={() => setMinimize(false)}>
          Add Note
        </p>
      )}
      {!minimize && (
        <>
          <div
            className="absolute top-3 right-3 rounded-full bg-neutral-700 w-6 h-2 cursor-pointer hover:bg-accent"
            onClick={() => setMinimize(true)}
          />
          <form className="space-y-5 p-2 z-10">
            <div className="flex flex-col space-y-1">
              <label
                htmlFor={titleId}
                className="text-xs mb-1 font-bold flex items-center"
              >
                Title
                <span className="ml-2 text-red-700/80 text-xxs">
                  (required)
                </span>
              </label>
              <input
                type="text"
                id={titleId}
                value={input.title}
                onChange={(e) => setinput({ ...input, title: e.target.value })}
                className="outline-none bottom-1 border-neutral-500 bg-neutral-800 p-1 focus-visible:ring-1 ring-green-500"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor={priorityId}
                className="text-xs mb-1 font-bold flex items-center"
              >
                Priority
                <span className="ml-2 text-red-700/80 text-xxs">
                  (required)
                </span>
              </label>
              <select
                name="priority"
                id={priorityId}
                value={input.priority}
                onChange={(e) =>
                  setinput({ ...input, priority: e.target.value })
                }
                className="bg-neutral-800 focus-visible:ring-1 ring-green-500 outline-none p-1"
              >
                <option>--Select Priority--</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor={descId}
                className="text-xs mb-1 font-bold flex items-center"
              >
                Description
                <span className="ml-2 text-neutral-500 text-xxs">
                  (optional)
                </span>
              </label>
              <textarea
                id={descId}
                value={input.description}
                className="outline-none bottom-1 border-neutral-500 bg-neutral-800 p-1 focus-visible:ring-1 ring-green-500"
                onChange={(e) =>
                  setinput({ ...input, description: e.target.value })
                }
              />
            </div>
            <button
              className="bg-blue-700 hover:bg-blue-900 font-qc p-1 font-semibold text-white w-full active:translate-y-[2px] shadow-sm shadow-black"
              type="button"
              onPointerDown={() => {
                mutate({
                  title: input.title,
                  description: input.description,
                  priority: input.priority,
                })
              }}
            >
              Add Note
            </button>
            {error && (
              <p className="bg-red-400/20 p-1 text-center text-xs">
                {JSON.parse(error.message)[0].message}
              </p>
            )}
          </form>
        </>
      )}
    </div>
  )
}

export default AddNoteForm
