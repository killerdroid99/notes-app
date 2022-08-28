import { createRouter } from "./context"
import { z } from "zod"
import { resolve } from "path"

export const notesRouter = createRouter()
  .query("get-notes", {
    async resolve({ ctx }) {
      const notes = await ctx.prisma.notes.findMany()
      return notes
    },
  })
  .query("get-notes-by-id", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const note = await ctx.prisma.notes.findUnique({
        where: {
          id: input.id,
        },
      })

      return note
    },
  })
