import { z } from "zod";
import { createTRPCRouter,protectedProcedure,publicProcedure } from "../trpc";
import { pollCommits } from "@/lib/github";

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
        await pollCommits(project.id)
        return project;
    }),
    getProjects : protectedProcedure.query(async ({ ctx }) => {
        const projects = await ctx.db.project.findMany({
            where:{
                userToProject:{
                    some:{
                        userId: ctx.user.userId!,
                    }
                },
                deletedAt: null,
            }
        })
        return projects;
    }),
    getCommits: protectedProcedure.input(z.object({
        projectId: z.string()
    })).query(async ({ctx, input}) => {
        return await ctx.db.commit.findMany({where: {projectId: input.projectId}})
    })
})