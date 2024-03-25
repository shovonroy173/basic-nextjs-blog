import React from "react";
import { getPost, getUser } from "@/lib/actions";
import Image from "next/image";
import img from "../../../../public/pexels-antoni-shkraba-4348404.jpg";
import Link from "next/link";

const SingleBlogPage = async ({ params }) => {
  const post = await getPost(params.slug);
  const author = await getUser(post.userEmail);

  // console.log(post, params.slug , author);

  return (
    <div className="h-dvh px-14 py-10">
      <div className="flex">
        <Image src={img} alt="img" className="w-[800px] h-full mr-10 " />
        <div className='space-y-10'>
          <p className="text-6xl text-cyan-950 font-semibold">{post.title}</p>
          <p className="text-md font-medium text-stone-600 space-x-4">
          <span>{author.name}</span>
          <span>{author.email}</span>
          <span>{post.createdAt?.toString().slice(4, 16)}</span>
          </p>
          <p className="text-xl font-normal text-cyan-600">{post.desc}</p>
          <div>
          <Link href="/blog" className="bg-purple-700 text-white rounded-lg px-2 py-1 font-bold text-lg hover:bg-white hover:text-purple-700">Go to Blogs</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;
