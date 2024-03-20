import { auth } from '@/lib/auth';
import React from 'react'
import PostForm from "@/components/postForm/PostForm"

const DashboardPage = async() => {
  const session = await auth();

  

  return (
    <div className='h-dvh bg-slate-400'>
    <PostForm session={session} />
    </div>
  )
}

export default DashboardPage