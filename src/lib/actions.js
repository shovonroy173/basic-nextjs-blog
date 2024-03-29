"use server";
import { connectToDb } from "./utils";
import { User, Post } from "@/lib/models";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "./auth";
import { revalidatePath } from "next/cache";

export const register = async (previousState, formData) => {
  const { name, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);
  console.log(name, email, password, img, passwordRepeat);
  if (password !== passwordRepeat) {
    return { error: "Password do not match!!" };
  }
  try {
    connectToDb();
    const user = await User.findOne({ name: name });

    if (user) {
      return { error: "Username alrady exists!!" };
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return { success: "Successfully registerd!" };
  } catch (error) {
    console.log(err);
    return { error: "Something went wrong!" };
  } //convert the FormData to
};

export const logout = async () => {
  "use server";
  await signOut();
};

export const login = async (previousState, formData) => {
  const { name, password } = Object.fromEntries(formData);
  console.log(name, password);
  try {
    await signIn("credentials", { name, password });
    console.log("LINE AT 48" ,"Login");
    return {success:"Added successfully!!"}
    
  } catch (error) {
    console.log(error);
    if (error.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw error;
  }
};

export const addPost = async (previousState, formData) => {
  const { title, desc, slug, userEmail , img} = Object.fromEntries(formData);
  console.log(title, desc, slug, userEmail);
  try {
    connectToDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      img , 
      userEmail,
    });

    await newPost.save();
    console.log("saved to db");
    // revalidatePath("/blog");
    return {success:"Added successfully!!"}
    // revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const getPosts = async()=>{
  try {
    const posts = await Post.find();
    return posts;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts");
  }
};

export const getPost = async(slug)=>{

  try {
    const posts = await Post.findOne({_id: slug});
    // const posts = "data"
    return posts;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts");
  }
}

export const getUser = async(email)=>{

  try {
    const user = await User.findOne({email});
    // const posts = "data"
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts");
  }
}
