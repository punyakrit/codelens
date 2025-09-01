import { z } from "zod";
import { createTRPCRouter,protectedProcedure,publicProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
    createProject : protectedProcedure.input(
        z.object({
            name: z.string(),
            repoUrl: z.string(),
            githubToken: z.string().optional(),
        })
    ).mutation(async ({ ctx,input }) => {
        const project = await ctx.db.project.create({
            data:{
                name: input.name,
                repoUrl: input.repoUrl,
                githubToken: input.githubToken,
                userToProject:{
                    create:{
                        userId: ctx.user.userId!,
                    }
                }
            }
        })
        return project;
    })
})