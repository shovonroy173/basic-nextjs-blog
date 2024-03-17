"use client";
import React from "react";
import { useFormState } from "react-dom";
import { addPost } from "@/lib/actions";

const PostForm = ({ session }) => {
  const [state, formAction] = useFormState(addPost, {});
  const userEmail = session.user.email;
  console.log(userEmail);
  return (
    <div className="flex flex-col justify-center items-center space-y-5">
      <form action={formAction} className="flex flex-col justify-center items-center space-y-5">
        <h1>Add New Post</h1>
        <input type="hidden" name="userEmail" value={userEmail} />
        <input type="text" name="title" placeholder="Title" />
        <input type="text" name="slug" placeholder="slug" />
        <input type="text" name="img" placeholder="img" />
        <textarea type="text" name="desc" placeholder="desc" rows={10} />
        <button>Add</button>
        {state?.error}
      </form>
    </div>
  );
};

export default PostForm;
