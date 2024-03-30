"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const links = [
  { path: "/about", description: "About page description", title: "About" },
  { path: "/blog", description: "Blog page description", title: "Blog" },

];
import  {useRouter} from "next/navigation"

const Links = ({ session }) => {
  const pathName = usePathname();
  // console.log("LINE AT 18", session);
  const router = useRouter();
  useEffect(()=>{
    !session && router.push("/login");
  } , [session]);

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
            "/dashboard" === pathName && "text-cyan-950 font-semibold text-center"
          }
        >
          Dashboard
          <AccountCircleIcon/>
        </Link>
        <form action={logout}>
          <button><LogoutIcon/></button>
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
