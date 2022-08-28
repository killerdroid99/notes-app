import { Disclosure } from "@headlessui/react"

interface NoteProps {
  title: string
  description?: string | null
  priority?: "high" | "low" | "medium" | string
}

function Note({ title, description, priority }: NoteProps) {
  return (
    <div className="Note flex justify-between">
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
        </Disclosure>
      </div>
    </div>
  )
}

export default Note
