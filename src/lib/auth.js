import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "../lib/utils";
import { User } from "@/lib/models";
import bcrypt from "bcryptjs";

// Separate login function
const login = async (credentials) => {

  try {
    connectToDb();
    const user = await User.findOne({ name: credentials.name });

    if (!user) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID || "8a478c556fb379b6268d",
      clientSecret: process.env.GITHUB_SECRET || "947b1afd553ed466d8ca7ebaa7913da2b9714171",
    }),
    CredentialsProvider({
      credentials: {
        // Custom login form fields
        name: { label: "name", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          // Handle login errors
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "your-secret-string-here",
  callbacks: async ({ user, account, profile }) => {
    console.log("LINE AT 15 AUTH.JS", user, account, profile);
    if (account.provider === "github") {
      connectToDb();
      try {
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          const newUser = new User({
            name: user.name,
            email: user.email,
            image: user.image,
          });
          const savedUser = await newUser.save();
          console.log("New user saved:", savedUser);
        }
      } catch (error) {
        console.error(error);
        return false;
      }
      return true;
    }
  },
});
