import React from "react";
import {auth, signIn } from "@/lib/auth.js";
import LoginForm from "@/components/loginForm/LoginForm";


const LoginPage =  async() => {
  const session = await auth();
  const handleGithubLogin = async (e) => {
    "use server";
    await signIn("github");
  };

  return (
    <div className="h-dvh flex flex-col space-y-20 justify-center items-center">
     <LoginForm session={session && session.user}/>
      <form action={handleGithubLogin}>
        <button>Login with Github</button>
      </form>
    </div>
  );
};

export default LoginPage;
