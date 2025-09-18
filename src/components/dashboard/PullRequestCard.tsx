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
      className='col-span-1 lg:col-span-2 cursor-pointer hover:shadow-md transition-shadow'
      onClick={handleClick}
    >
      <CardContent className='flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 text-center'>
        <div className='mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-pink-100 dark:bg-pink-900/20'>
          <GitPullRequest className='h-6 w-6 sm:h-8 sm:w-8 text-pink-600 dark:text-pink-400' />
        </div>
        <h3 className='text-base sm:text-lg font-semibold mb-2'>Pull Requests</h3>
        <p className='text-xs sm:text-sm text-muted-foreground'>
          View and manage pull requests
        </p>
      </CardContent>
    </Card>
  )
}

export default PullRequestCard
