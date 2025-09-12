import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { pollCommits } from "@/lib/github";
import { checkCredits, indexGithubRepository } from "@/lib/github-loader";
import { pollPRs } from "@/lib/pr";

export const projectRouter = createTRPCRouter({
    createProject: protectedProcedure.input(
        z.object({
            name: z.string(),
            repoUrl: z.string(),
            githubToken: z.string().optional(),
        })
    ).mutation(async ({ ctx, input }) => {
        const userCredits = await ctx.db.user.findUnique({
            where: { id: ctx.user.userId! },
            select: { credits: true }
        })
       const currentCredits = userCredits?.credits || 0
       const fileCount = await checkCredits(input.repoUrl, input.githubToken)
       if(currentCredits < fileCount) {
        throw new Error("Insufficient credits")
       }
       

        const project = await ctx.db.project.create({
            data: {
                name: input.name,
                repoUrl: input.repoUrl,
                githubToken: input.githubToken,
                userToProject: {
                    create: {
                        userId: ctx.user.userId!,
                    }
                }
            }
        })
        await indexGithubRepository(project.id, input.repoUrl, input.githubToken)
        await pollCommits(project.id)
        await pollPRs(input.repoUrl, project.id)
        await ctx.db.user.update({
            where: { id: ctx.user.userId! },
            data: { credits: { decrement: fileCount } }
           })
        return project;
    }),
    getProjects: protectedProcedure.query(async ({ ctx }) => {
        const projects = await ctx.db.project.findMany({
            where: {
                userToProject: {
                    some: {
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
    })).query(async ({ ctx, input }) => {
        pollCommits(input.projectId).then().catch(console.error)
        return await ctx.db.commit.findMany({
            where: { projectId: input.projectId },
            orderBy: { commitDate: "desc" }
        })
    }),
    saveAnswer: protectedProcedure.input(z.object({
        projectId: z.string(),
        question: z.string(),
        answer: z.string(),
        fileReference: z.any()
    })).mutation(async ({ ctx, input }) => {
        return await ctx.db.question.create({
            data: {
                projectId: input.projectId,
                question: input.question,
                answer: input.answer,
                userId: ctx.user.userId!,
                fileReference: input.fileReference
            }
        })
    }),
    getQuestions: protectedProcedure.input(z.object({
        projectId: z.string()
    })).query(async ({ ctx, input }) => {
        return await ctx.db.question.findMany({
            where: { projectId: input.projectId },
            include: {
                user: true
            },
            orderBy: { createdAt: "desc" }
        })
    }),
    archiveProject: protectedProcedure.input(z.object({
        projectId: z.string()
    })).mutation(async ({ ctx, input }) => {
        return await ctx.db.project.update({
            where: { id: input.projectId },
            data: { deletedAt: new Date() }
        })
    }),
    getTeamMembers: protectedProcedure.input(z.object({
        projectId: z.string()
    })).query(async ({ ctx, input }) => {
        return await ctx.db.userToProject.findMany({
            where: { projectId: input.projectId },
            include: {
                user: true
            }
        })
    }),
    getCredits: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.db.user.findUnique({
            where: { id: ctx.user.userId! },
            select: { credits: true }
        })
    }),
    checkCredits: protectedProcedure.input(z.object({
        githubUrl: z.string(),
        githubToken: z.string().optional()
    })).mutation(async ({ ctx, input }) => {
        const fileCount = await checkCredits(input.githubUrl, input.githubToken)
        const userCredits = await ctx.db.user.findUnique({
            where: { id: ctx.user.userId! },
            select: { credits: true }
        })
        return { fileCount, userCredits: userCredits?.credits || 0 }
    }),
    getPRs: protectedProcedure.input(z.object({
        projectId: z.string()
    })).query(async ({ ctx, input }) => {
        return await ctx.db.pullRequest.findMany({
            where: { projectId: input.projectId },
        })
    })


})