import { Disclosure, Transition } from "@headlessui/react"
import { trpc } from "../utils/trpc"

interface NoteProps {
  Id: string
  title: string
  description?: string | null
  priority?: "high" | "low" | "medium" | string
}

function Note({ Id, title, description, priority }: NoteProps) {
  const { mutate } = trpc.useMutation(["notes.delete-note"])
  return (
    <div className="Note flex group relative">
      <div className="absolute text-sm font-bold bg-gray-50/10 py-1 top-0 right-[42%] w-fit rounded-bl-lg rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity ease-in select-none">
        <span
          className="hover:text-red-400 cursor-pointer transition-colors ease-in px-2 border-r border-white border-collapse"
          onPointerDown={() => {
            window.confirm("Delete this note?") && mutate({ id: Id })
          }}
        >
          DELETE
        </span>
        <span className="hover:text-amber-500 cursor-pointer transition-colors ease-in px-2 border-l border-white border-collapse">
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
      <h2 className="w-full h-fit">{title}</h2>
      <div className="flex flex-col items-end relative w-full">
        <Disclosure>
          <Disclosure.Button className="">More Info</Disclosure.Button>
          <Transition
            enter="transition duration-200 ease-in"
            enterFrom="transform scale-0 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-200 ease-in"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-0 opacity-0"
          >
            <Disclosure.Panel className="text-slate-400 bg-slate-900/20 p-3 border-l-4 border-teal-900 w-[30rem]">
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
              <p className="text-white">
                {description ? (
                  <>{description}</>
                ) : (
                  <>No description provided 😢</>
                )}
              </p>
            </Disclosure.Panel>
          </Transition>
        </Disclosure>
      </div>
    </div>
  )
}

export default Note
