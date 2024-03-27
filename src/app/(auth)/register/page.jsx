"use client";
import {register} from "@/lib/actions"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const RegisterPage = () => {
    const [state , formAction] = useFormState(register , {});
console.log(state);
    const router = useRouter();

    useEffect(()=>{
        state.success && router.push("/")
    } , [router , state.success ])
  return (
    <form className="flex flex-col justify-center items-center space-y-5" action={formAction}>
      <input type="text" placeholder="name" name="name" />
      <input type="email" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <input
        type="password"
        placeholder="password again"
        name="passwordRepeat"/>
      <button>Register</button>
      
      <Link href="/login">
        Have an account? <b>Login</b>
      </Link>
    </form>
  );
};

export default RegisterPage;