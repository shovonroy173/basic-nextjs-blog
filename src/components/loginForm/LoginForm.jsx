"use client"
import React, { useEffect } from "react";
import { useFormState } from 'react-dom';
import { login } from '@/lib/actions';
import { useRouter } from "next/navigation";

const LoginForm = ({session}) => {
    const [state , formLogin] = useFormState(login , {});
    console.log("LINE AT 9" , session);
    const router = useRouter();
    useEffect(()=>{
      session && router.push("/")
    } , [session])

  return (
    <div>
      <form action={formLogin} className="flex flex-col space-y-10 w-[500px]">
        <input type="text" placeholder="username" name="name" />
        <input type="password" placeholder="password" name="password" />
        <button>Login with credentials</button>
      </form>
      {state.error}
    </div>
  );
};

export default LoginForm;
