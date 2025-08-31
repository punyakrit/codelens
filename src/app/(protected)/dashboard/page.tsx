"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'

function Page() {
    const {user } = useUser()
  return (
    <div>
        {user?.firstName}
    </div>
  )
}

export default Page