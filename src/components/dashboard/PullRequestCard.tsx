"use client";
import React from 'react'
import { Card, CardContent } from '../ui/card'
import { useRouter } from 'next/navigation'
import { GitPullRequest } from 'lucide-react'

function PullRequestCard() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/pr')
  }

  return (
    <Card 
      className='col-span-2 cursor-pointer '
      onClick={handleClick}
    >
      <CardContent className='flex flex-col items-center justify-center p-8 text-center'>
        <div className='mb-4 p-4 rounded-full bg-pink-100 dark:bg-pink-900/20'>
          <GitPullRequest className='h-8 w-8 text-pink-600 dark:text-pink-400' />
        </div>
        <h3 className='text-lg font-semibold mb-2'>Pull Requests</h3>
        <p className='text-sm text-muted-foreground'>
          View and manage pull requests
        </p>
      </CardContent>
    </Card>
  )
}

export default PullRequestCard
