"use client"
import useProject from '@/hooks/use-project';
import { useUser } from '@clerk/nextjs'
import React from 'react'

function Page() {
  const { project } = useProject();
  return (
    <div>
      {JSON.stringify(project)}
    </div>
  )
}

export default Page