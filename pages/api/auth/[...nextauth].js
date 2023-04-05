import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
// import CredentialsProvider from "next-auth/providers/credentials";
import MongoConnection from "@/connection/dbconnection";
import User from "@/Model/userSchema";
import bcrypt from "bcrypt";
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials, req, res) {
        MongoConnection().catch((error) => {
          error: "Connection Failed...!";
        });
        console.log(credentials);
        const result = await User.findOne({ email: credentials.email });

        if (!result) {
          console.log("not found");
          throw new Error("No user Found with Email Please Sign Up...!");
        }

        // compare()
        const checkPassword = await bcrypt.compare(
          credentials.password,
          result.password
        );

        // incorrect password
        if (!checkPassword || result.email !== credentials.email) {
          console.log("Username or Password doesn't match");
          throw new Error("Username or Password doesn't match");
        }

        return result;

        console.log(credentials.email);
      },
    }),
  ],
});
