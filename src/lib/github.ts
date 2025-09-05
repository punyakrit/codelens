import { db } from "@/server/db";
import { Octokit } from "octokit";
import axios from "axios"
import { getSummariseCommit } from "./gemini";
export const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});



type Response = {
    commitHash: string;
    commitMessage: string;
    commitAuthorName: string;
    commitAuthorAvatarUrl: string;
    commitDate: string;
}

export const getCommitsHash = async (githubUrl: string): Promise<Response[]> => {
    const [owner, repo] = githubUrl.split("/").slice(-2)
    if (!owner || !repo) {
        throw new Error("Invalid github url")
    }
    const { data } = await octokit.rest.repos.listCommits({
        owner: owner,
        repo: repo,
    })
    const sortedCommits = data.sort((a: any, b: any) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime()) as any[]
    return sortedCommits.slice(0, 10).map((commit) => ({
        commitHash: commit.sha ?? "",
        commitMessage: commit?.commit?.message ?? "",
        commitAuthorName: commit?.commit?.author?.name ?? "",
        commitAuthorAvatarUrl: commit?.author?.avatar_url ?? "",
        commitDate: commit?.commit?.author?.date ?? "",
    }))
}

export const pollCommits = async (projectId: string) => {
    const {  githubUrl } = await fetchProjectGithubUrl(projectId)
    // if(!githubUrl){
    //     throw Error("URL not there")
    // }
    const commitsHashes = await getCommitsHash(githubUrl)
    const unprocessedCommits = await filterUnprocessedCommits(projectId, commitsHashes)
    const summaryResponses = await Promise.allSettled(unprocessedCommits.map((commit)=>{
        return summarizeCommits(githubUrl, commit.commitHash)
    }))
    const summaries = summaryResponses.map((response)=>{
        if(response.status==="fulfilled"){
            return response.value
        }
        return ""
    })
    console.log(summaries.length, "length added")

    const commits = await Promise.allSettled(summaries.map((summary,index) =>{
        return db.commit.create({
            data: {
                projectId: projectId,
                commitHash : unprocessedCommits[index]!.commitHash,
                commitMessage: unprocessedCommits[index]!.commitMessage,
                commitAuthorName: unprocessedCommits[index]!.commitAuthorName,
                commitAuthorAvatarUrl: unprocessedCommits[index]!.commitAuthorAvatarUrl,
                commitDate: unprocessedCommits[index]!.commitDate,
                summary: summary
            }
        }).catch(() => null)
    }))

    return commits
}



async function summarizeCommits(githubUrl: string, commitsHashes: string) {
    const data = await axios.get(`${githubUrl}/commit/${commitsHashes}.diff`,{
        headers:{
            Accept:'applidation/vnd.github.v3.diff'
        }
    })
    return await getSummariseCommit(data.data) || ""

}



async function fetchProjectGithubUrl(projectId: string) {
    const project = await db.project.findUnique({
        where: {
            id: projectId
        },
        select: {
            repoUrl: true,
        }
    })
    if (!project) {
        throw new Error(`Project with ID ${projectId} not found`)
    }
    if (!project.repoUrl) {
        throw new Error(`Project ${projectId} has no repository URL configured`)
    }
    return { githubUrl: project.repoUrl }
}


async function filterUnprocessedCommits(projectId: string, commitsHashes: Response[]) {
    const processedCommitHashes = await db.commit.findMany({
        where: {
            projectId: projectId
        },
        select: {
            commitHash: true
        }
    })
    const processedHashes = new Set(processedCommitHashes.map(c => c.commitHash))
    const unprocessedCommits = commitsHashes.filter((commit) => !processedHashes.has(commit.commitHash))
    return unprocessedCommits
}
