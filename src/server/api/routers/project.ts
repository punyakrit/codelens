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

        console.log(input)
        return true;
    })
})