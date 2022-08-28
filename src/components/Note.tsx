interface NoteProps {
  title: string
  description?: string
  priority?: "high" | "low" | "medium" | string
}

function Note({ title, description, priority }: NoteProps) {
  return (
    <div className={`Note`}>
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
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

export default Note
