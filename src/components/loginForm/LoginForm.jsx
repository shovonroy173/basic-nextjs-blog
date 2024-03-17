"use client"
import React from "react";
import { useFormState } from 'react-dom';
import { login } from '@/lib/actions';

const LoginForm = () => {
    const [state , formLogin] = useFormState(login , {});
    console.log(state);

  return (
    <div>
      <form action={formLogin}>
        <input type="text" placeholder="username" name="name" />
        <input type="password" placeholder="password" name="password" />
        <button>Login with credentials</button>
      </form>
    </div>
  );
};

export default LoginForm;
