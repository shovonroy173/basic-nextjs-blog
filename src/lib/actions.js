"use server";
import { connectToDb } from "./utils";
import { User , Post } from "@/lib/models";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "./auth";

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
  console.log(name , password);
  try {
    await signIn("credentials", { name, password });
  } catch (error) {
    console.log(error);
    if (error.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw  error;
  }
};

export const addPost = async (prevState,formData) => {
  const { title, desc, slug, userEmail } = Object.fromEntries(formData);
console.log(title, desc, slug, userEmail);
  try {
    connectToDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      userEmail,
    });

    await newPost.save();
    console.log("saved to db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

