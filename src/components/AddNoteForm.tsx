import { useId, useState } from "react"
import { useQueryClient } from "react-query"
import { trpc } from "../utils/trpc"
import { motion, AnimatePresence } from "framer-motion"

function AddNoteForm() {
  const titleId = useId()
  const descId = useId()
  const priorityId = useId()
  const [minimize, setMinimize] = useState(true)
  const { mutate, error, isLoading } = trpc.useMutation(["notes.add-note"], {
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
    <>
      <button
        className="fixed z-10 right-[5vw] lg:right-[20vw] top-[6rem] bg-zinc-900 hover:text-accent p-1 rounded w-fit"
        onClick={() => setMinimize(false)}
      >
        Add Note
      </button>
      <AnimatePresence initial={false}>
        {!minimize && (
          <motion.div
            drag
            dragConstraints={{
              top: -10,
              left: -50,
              right: 200,
              bottom: 500,
            }}
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: {
                scale: 1,
                opacity: 1,
              },
              collapsed: {
                scale: 0.5,
                opacity: 0,
              },
            }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="fixed z-10 right-[5vw] lg:right-[20vw] top-20 bg-zinc-900 p-2 bg-opacity-70 backdrop-blur-md ring-2 ring-primary"
          >
            <div
              className="absolute top-3 right-3 rounded-full bg-neutral-700 w-6 h-2 cursor-pointer hover:bg-accent"
              onClick={() => setMinimize(true)}
            />
            <form
              // transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="space-y-5 p-2 z-10"
              onSubmit={(e) => e.preventDefault()}
            >
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
                  onChange={(e) =>
                    setinput({ ...input, title: e.target.value })
                  }
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
                className="bg-blue-700 hover:bg-blue-900 font-qc p-1 font-semibold text-white w-full active:translate-y-[2px] shadow-xs shadow-black h-8"
                type="button"
                onPointerDown={() => {
                  mutate({
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
                  <>Add Note</>
                )}
              </button>
              {error && (
                <p className="bg-red-400/20 p-1 text-center text-xs">
                  {JSON.parse(error.message)[0].message}
                </p>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AddNoteForm
