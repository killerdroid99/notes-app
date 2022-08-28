// src/server/router/index.ts
import { createRouter } from "./context"
import superjson from "superjson"

import { exampleRouter } from "./example"
import { protectedExampleRouter } from "./protected-example-router"
import { notesRouter } from "./add-note"

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("auth.", protectedExampleRouter)
  .merge("notes.", notesRouter)

// export type definition of API
export type AppRouter = typeof appRouter
