"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions";

const links = [
  { path: "/about", description: "About page description", title: "About" },
  { path: "/blog", description: "Blog page description", title: "Blog" },
  {
    path: "/contact",
    description: "Contact page description",
    title: "Contact",
  },
];

const Links = ({ session }) => {
  const pathName = usePathname();
  console.log("LINE AT 18", session);

  return (
    <div className="flex justify-between w-[500px]">
      {links.map((item, index) => (
        <Link
          href={item.path}
          key={index}
          className={`${
            item.path === pathName && `text-cyan-950 font-semibold`
          }`}
        >
          {`${item.title}`}
        </Link>
      ))}
      { session && session.user ? (
        <>
        <Link
          href="/dashboard"

          className={
            "/dashboard" === pathName && "text-cyan-950 font-semibold"
          }
        >
          Dashboard
        </Link>
        <form action={logout}>
          <button>Logout</button>
        </form>
        </>
      ) : (
        <Link href="/login">
          <button>Login</button>
        </Link>
      )}
    </div>
  );
};

export default Links;
