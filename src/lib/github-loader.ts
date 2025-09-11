import { GithubRepoLoader } from '@langchain/community/document_loaders/web/github'
import { Document } from '@langchain/core/documents'
import { getGenerateEmbeddings, getSummariseCode } from './gemini'
import { db } from '@/server/db'
import { Octokit } from 'octokit'


async function getFilesCount(path: string, octokit: Octokit, githubOwner: string, githubRepo: string, acc: number = 0) {
    const { data } = await octokit.rest.repos.getContent({
        owner: githubOwner as string,
        repo: githubRepo as string,
        path: path,
    })
    if (!Array.isArray(data) && data.type === 'file') {
        return acc + 1
    }
    if (Array.isArray(data)) {
        let filesCount = 0
        const directory: string[] = []

        for (const file of data) {
            if (file.type === 'file') {
                filesCount++
            }
            if (file.type === 'dir') {
                directory.push(file.path)
            }
        }
        if (directory.length > 0) {
            const dirCount = await Promise.all(directory.map(dir => getFilesCount(dir, octokit, githubOwner, githubRepo, filesCount)))
            filesCount += dirCount.reduce((acc, dir) => acc + dir, 0)
        }
        return acc + filesCount
    }
    return acc

}

export async function checkCredits(githubUrl: string, githubToken?: string) {
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
    })
    const githubOwner = githubUrl.split('/')[3]
    const githubRepo = githubUrl.split('/')[4]
    if (!githubOwner || !githubRepo) {
        return 0
    }

    const filesCount = await getFilesCount('', octokit, githubOwner, githubRepo, 0)
    return filesCount

}



export async function loadGithubRepository(githubUrl: string, githubToken?: string) {
    const loader = new GithubRepoLoader(githubUrl, {
        accessToken: githubToken || '',
        branch: 'main',
        ignoreFiles: ['.github', '.gitignore', '.git', '.DS_Store', 'package-lock.json', 'pnpm-lock.yaml', 'yarn.lock', 'bun.lockb', 'bun.lock'],
        recursive: true,
        unknown: 'warn',
        maxConcurrency: 5
    })
    const docs = await loader.load()
    return docs
}


export async function indexGithubRepository(projectId: string, githubUrl: string, githubToken?: string) {
    const docs = await loadGithubRepository(githubUrl, githubToken)
    const allEmbeddings = await generateEmbeddings(docs as Document[])
    await Promise.allSettled(allEmbeddings.map(async (result, index) => {
        if (result.status === 'rejected' || !result.value) {
            return
        }
        const embedding = result.value
        const sourceCodeEmbiddings = await db.sourceCodeEmbiddings.create({
            data: {
                sourceCode: embedding.sourceCode,
                fileName: embedding.fileName,
                Summary: embedding.summary,
                projectId: projectId
            }
        })
        await db.$executeRaw`
        UPDATE "SourceCodeEmbiddings"
        SET "summaryEmbedding" = ${embedding.embedding}::vector
        WHERE "id" = ${sourceCodeEmbiddings.id}
        `
    }))
}

async function generateEmbeddings(docs: Document[]) {
    return await Promise.allSettled(docs.map(async doc => {
        const summary = await getSummariseCode(doc)
        const embedding = await getGenerateEmbeddings(summary)
        return {
            summary,
            embedding,
            fileName: doc.metadata.source,
            sourceCode: JSON.parse(JSON.stringify(doc.pageContent))
        }
    }))
}