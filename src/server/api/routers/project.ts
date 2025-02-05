import { z } from "zod"
import { InputOTPGroup } from "@/components/ui/input-otp"
import { createTRPCRouter, protectedProcedure } from "../trpc"

// TRPC router acts as a express router
// provides end to end save communication between backend and frontend
export const projectRouter = createTRPCRouter({
    createProject: protectedProcedure
      .input(
        z.object({
          name: z.string(),
          githubUrl: z.string(),
          githubToken: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const project = await ctx.db.project.create({
          data: {
            githubUrl: input.githubUrl,
            name: input.name,
            userToProjects: {
              create: {
                userId: ctx.user.userId!,
              },
            },
          },
        });
        return project;
      }),
      getProjects: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.db.project.findMany({
          where: {
            userToProjects: {
              some: {
                userId: ctx.user.userId!,
              },
            },
            deletedAt: null,
          }
        })
      })
  });
  