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
  const { mutate, error, isLoading } = trpc.useMutation(["notes.update-note"], {
    onSuccess() {
      qc.invalidateQueries(["notes.get-notes"])
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
        <div
          className="bg-red-500 hover:bg-red-600 w-fit rounded-sm absolute right-4 top-3 active:translate-y-px cursor-pointer"
          onPointerDown={() => setVisible(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </div>
        <form
          className="space-y-5 p-2 z-10"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col space-y-1">
            <label
              htmlFor={titleId}
              className="text-xs mb-1 font-bold flex items-center"
            >
              Title
              <span className="ml-2 text-red-700/80 text-xxs">(required)</span>
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
              <span className="ml-2 text-red-700/80 text-xxs">(required)</span>
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
            <label
              htmlFor={descId}
              className="text-xs mb-1 font-bold flex items-center"
            >
              Description
              <span className="ml-2 text-neutral-500 text-xxs">(optional)</span>
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
            className="bg-green-700 hover:bg-green-900 font-qc p-1 font-semibold text-white w-full active:translate-y-[2px] shadow-xs shadow-black h-8"
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
            {isLoading ? (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="w-5 h-5 animate-spin mx-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 11h5v2H2zm15 0h5v2h-5zm-6 6h2v5h-2zm0-15h2v5h-2zM4.222 5.636l1.414-1.414 3.536 3.536-1.414 1.414zm15.556 12.728-1.414 1.414-3.536-3.536 1.414-1.414zm-12.02-3.536 1.414 1.414-3.536 3.536-1.414-1.414zm7.07-7.071 3.536-3.535 1.414 1.415-3.536 3.535z"></path>
              </svg>
            ) : (
              <>Save Changes</>
            )}
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
