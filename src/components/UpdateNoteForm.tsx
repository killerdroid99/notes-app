import { Dispatch, SetStateAction, useId, useState } from "react"
import { useQueryClient } from "react-query"
import { trpc } from "../utils/trpc"

interface UpdateNoteFormProps {
  Id: string
  old_title: string
  old_priority: string
  old_description: string
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

function UpdateNoteForm({
  Id,
  old_title,
  old_priority,
  old_description,
  visible,
  setVisible,
}: UpdateNoteFormProps) {
  const titleId = useId()
  const descId = useId()
  const priorityId = useId()
  const { mutate, error } = trpc.useMutation(["notes.update-note"], {
    onSuccess() {
      qc.invalidateQueries(["notes.get-notes"])
      // setinput({
      //   title: "",
      //   description: "",
      //   priority: "",
      // })
      setVisible(false)
    },
  })
  const [input, setinput] = useState({
    title: old_title,
    description: old_description,
    priority: old_priority,
  })
  const qc = useQueryClient()

  if (visible) {
    return (
      <div className="fixed z-10 left-[2vw] lg:left-[10vw] top-20 bg-zinc-900 p-2 bg-opacity-70 backdrop-blur-md ring-2 ring-primary">
        <form className="space-y-5 p-2 z-10">
          <div className="flex flex-col space-y-1">
            <label htmlFor={titleId} className="text-base flex items-center">
              Title
              <span className="ml-1 text-red-700/80 text-xs">(required)</span>
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
            <label htmlFor={priorityId} className="text-base flex items-center">
              Priority
              <span className="ml-1 text-red-700/80 text-xs">(required)</span>
            </label>
            <select
              name="priority"
              id={priorityId}
              value={input.priority}
              onChange={(e) => setinput({ ...input, priority: e.target.value })}
              className="bg-neutral-800 focus-visible:ring-1 ring-green-500 outline-none p-1"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor={descId} className="text-base flex items-center">
              Description
              <span className="ml-1 text-neutral-500 text-xs">(optional)</span>
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
            className="bg-green-700 hover:bg-green-900 font-qc p-1 font-semibold text-white w-full active:translate-y-[2px] shadow-sm shadow-black"
            type="button"
            onPointerDown={() => {
              mutate({
                id: Id,
                title: input.title,
                description: input.description,
                priority: input.priority,
              })
            }}
          >
            Save Changes
          </button>
          {error && (
            <p className="bg-red-400/20 p-1 font-bold text-sm">
              {JSON.parse(error.message)[0].message}
            </p>
          )}
        </form>
      </div>
    )
  }

  return <></>
}

export default UpdateNoteForm
