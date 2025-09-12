import { Octokit } from "octokit";
import { db } from "@/server/db";
import axios from "axios";
import { getSummariseCommit } from "./gemini";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
})

type PRResponse = {
    id: number;
    number: number;
    title: string;
    body: string | null;
    html_url: string;
    diff_url: string;
    user: {
        login: string;
        avatar_url: string;
        html_url: string;
    };
    created_at: string;
    updated_at: string;
    state: string;
}

export const getPRs = async (githubUrl: string): Promise<PRResponse[]> => {
    const [owner, repo] = githubUrl.split("/").slice(-2)
    if (!owner || !repo) {
        throw new Error("Invalid github url")
    }
    
    const { data } = await octokit.rest.pulls.list({
        owner: owner,
        repo: repo,
        state: "open",
        per_page: 20,
    })
    
    return data.map((pr: any) => ({
        id: pr.id,
        number: pr.number,
        title: pr.title,
        body: pr.body,
        html_url: pr.html_url,
        diff_url: pr.diff_url,
        user: {
            login: pr.user.login,
            avatar_url: pr.user.avatar_url,
            html_url: pr.user.html_url,
        },
        created_at: pr.created_at,
        updated_at: pr.updated_at,
        state: pr.state,
    }))
}

export const pollPRs = async (githubUrl: string, projectId: string) => {
    const prs = await getPRs(githubUrl)
    const unprocessedPRs = await filterUnprocessedPRs(projectId, prs)
    
    console.log(`Processing ${unprocessedPRs.length} unprocessed PRs`)
    
    const summaryResponses = await Promise.allSettled(unprocessedPRs.map((pr) => {
        return summarizePR(githubUrl, pr.number)
    }))
    
    const summaries = summaryResponses.map((response, index) => {
        if (response.status === "fulfilled") {
            return response.value
        } else {
            console.error(`Failed to summarize PR ${unprocessedPRs[index]?.number}:`, response.reason)
            return `Failed to summarize: ${response.reason?.message || 'Unknown error'}`
        }
    })
    
    console.log(`${summaries.length} PR summaries processed`)

    const pullRequests = await Promise.allSettled(summaries.map(async (summary, index) => {
        try {
            const diff = await getPRDiff(githubUrl, unprocessedPRs[index]!.number)
            const truncatedDiff = truncateDiff(diff, 5000)
            
            return db.pullRequest.create({
                data: {
                    projectId: projectId,
                    title: unprocessedPRs[index]!.title,
                    bodySummary: summary,
                    url: unprocessedPRs[index]!.html_url,
                    diff: truncatedDiff,
                    user_login: unprocessedPRs[index]!.user.login,
                    user_avatar_url: unprocessedPRs[index]!.user.avatar_url,
                    user_github_url: unprocessedPRs[index]!.user.html_url,
                }
            })
        } catch (error) {
            console.error(`Failed to create PR record for ${unprocessedPRs[index]?.number}:`, error)
            return null
        }
    }))

    const successful = pullRequests.filter(result => result.status === 'fulfilled' && result.value !== null).length
    console.log(`Successfully processed ${successful} out of ${pullRequests.length} PRs`)

    return pullRequests
}

async function summarizePR(githubUrl: string, prNumber: number) {
    try {
        const diff = await getPRDiff(githubUrl, prNumber)
        const truncatedDiff = truncateDiff(diff)
        return await getSummariseCommit(truncatedDiff) || ""
    } catch (error) {
        console.error(`Error summarizing PR ${prNumber}:`, error)
        return ""
    }
}

function truncateDiff(diff: string, maxLines: number = 2000): string {
    if (!diff) return ""
    
    const lines = diff.split('\n')
    
    if (lines.length <= maxLines) {
        return diff
    }
    
    console.log(`Truncating diff from ${lines.length} lines to ${maxLines} lines`)
    
    const headerLines = lines.slice(0, 50)
    const middleLines = lines.slice(50, maxLines - 50)
    const truncatedDiff = [...headerLines, ...middleLines].join('\n')
    
    return truncatedDiff + `\n\n... [DIFF TRUNCATED: ${lines.length - maxLines} more lines omitted for performance]`
}

async function getPRDiff(githubUrl: string, prNumber: number): Promise<string> {
    try {
        const response = await axios.get(`${githubUrl}/pull/${prNumber}.diff`, {
            headers: {
                Accept: 'application/vnd.github.v3.diff'
            },
            timeout: 30000,
            maxContentLength: 10 * 1024 * 1024,
            maxBodyLength: 10 * 1024 * 1024
        })
        
        const diff = response.data
        console.log(`Fetched PR ${prNumber} diff: ${diff.length} characters`)
        
        return diff
    } catch (error) {
        console.error(`Error fetching PR diff for ${prNumber}:`, error)
        return ""
    }
}

async function filterUnprocessedPRs(projectId: string, prs: PRResponse[]) {
    const processedPRs = await db.pullRequest.findMany({
        where: {
            projectId: projectId
        },
        select: {
            url: true
        }
    })
    const processedUrls = new Set(processedPRs.map(pr => pr.url))
    const unprocessedPRs = prs.filter((pr) => !processedUrls.has(pr.html_url))
    return unprocessedPRs
}


