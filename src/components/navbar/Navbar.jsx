import Link from 'next/link'
import React from 'react'
import Links from "./Links";
import { auth } from '@/lib/auth';
const Navbar = async() => {
  const session = await auth();
  // console.log(session);
  return (
    <div className='px-14 flex justify-between items-center h-20'>
      <Link href="/">Logo <span>.</span></Link>
      <div>
      <Links session={session}/>

      </div>
    </div>
  )
}

export default Navbar