import { getPosts } from '@/lib/actions'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import img from "../../../public/pexels-antoni-shkraba-4348404.jpg";

const BlogPage = async() => {
  const posts = await getPosts();
  // console.log(posts);
  return (
    <div className='px-14 py-10 flex justify-between items-center flex-wrap '>
      {posts?.map((item , index)=>(
        <div key={index} className='mr-10 mb-5'>
        <Image src={img}   alt="img" className='w-[350px] h-[450px] object-cover '/>
        <div className='text-cyan-950 font-semibold'>
          <p className='text-2xl'>{item.title}</p>
          <p>{item.createdAt?.toString().slice(4, 16)}</p>
          <Link href={`/blog/${item._id}` } className='text-fuchsia-950 font-medium hover:underline'>Read more</Link>
        </div>
      </div>
      ))}
      
    </div>
  )
}

export default BlogPage