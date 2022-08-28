import { useId, useState } from "react"

function AddNoteForm() {
  const titleId = useId()
  const descId = useId()
  const [minimize, setMinimize] = useState(true)
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
            className="absolute top-3 right-3 rounded-full bg-neutral-700 w-6 h-2 cursor-pointer"
            onClick={() => setMinimize(true)}
          />
          <form className="space-y-5 p-2 z-10">
            <div className="flex flex-col space-y-1">
              <label htmlFor={titleId} className="text-base">
                Title
              </label>
              <input
                type="text"
                id={titleId}
                className="outline-none bottom-1 border-neutral-500 bg-neutral-800 p-1 focus-visible:ring-1 ring-green-500"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor={titleId} className="text-base">
                Priority
              </label>
              <select
                name="priority"
                id=""
                className="bg-neutral-800 focus-visible:ring-1 ring-green-500 outline-none p-1"
              >
                <option>--Select Priority--</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor={descId} className="text-base">
                Description
              </label>
              <textarea
                id={descId}
                className="outline-none bottom-1 border-neutral-500 bg-neutral-800 p-1 focus-visible:ring-1 ring-green-500"
              />
            </div>
            <button
              className="bg-blue-700 hover:bg-blue-900 font-qc p-1 font-semibold text-white w-full active:translate-y-[2px] shadow-sm shadow-black"
              type="button"
            >
              Add Note
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default AddNoteForm
