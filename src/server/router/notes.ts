import { createRouter } from "./context"
import { z } from "zod"
import * as trpc from "@trpc/server"

export const notesRouter = createRouter()
  .query("get-notes", {
    async resolve({ ctx }) {
      const notes = await ctx.prisma.notes.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId: ctx.session?.user?.id,
        },
      })
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
  .mutation("add-note", {
    input: z.object({
      title: z.string(),
      description: z.string(),
      priority: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user) {
        const new_note = await prisma?.notes.create({
          data: {
            ...input,
            userId: ctx.session.user.id,
          },
        })

        return { msg: "new note added", new_note }
      }

      return new trpc.TRPCError({
        code: "FORBIDDEN",
        message: "You need to login to perform this operation",
      })
    },
  })
  .mutation("delete-note", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (ctx.session?.user) {
        const x_note = await ctx.prisma.notes.delete({
          where: {
            id: input.id,
          },
        })

        return { msg: " note deleted", x_note }
      }

      return new trpc.TRPCError({
        code: "FORBIDDEN",
        message: "You need to login to perform this operation",
      })
    },
  })
