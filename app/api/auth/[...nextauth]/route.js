
import { connectDB } from "@/db/mongodb";
import User from "@/models/User";
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
          }),

        CredentialsProvider({
        name:"credentials",
        credentials: {
            email: { label: "Email", type: "email", placeholder: "Enter Email" },
            password: {
              label: "Password",
              type: "password",
              placeholder: "Enter Password",
            },
          },

          async authorize(credentials){
            await connectDB()

            if (!credentials.email) {
                throw new Error("Please enter an email ");
              }
              if (!credentials.password) {
                throw new Error("Please enter password");
              }

            const user = await User.findOne({email: credentials.email})
            if(!user){
                throw new Error("User not found")
            }

            return user
          }

        })
       
    ],



    callbacks:{
        async signIn({user, profile}){
          await connectDB()
            try {
              
              const userExist = await User.findOne({email: user.email})
                if(!userExist){
                  return await User.create({
                       username:profile.name,
                        email:profile.email,
                        image:profile.picture
                    }) 

                  }
                  return true
            } catch (error) {
                console.log(error)
                return false
            }
        },

        async session({session, user}){
            try {
                const sessionUser = await User.findOne({email: session?.user.email})
                session.user.id = sessionUser._id.toString()

                return Promise.resolve(session)

                
            } catch (error) {
                console.log(error)
            }
            return session
            }

                    
                },
                pages:{
                    signIn:"/login"
                },

                secret: process.env.NEXTAUTH_SECRET,
                session: {
                  strategy: "jwt",
                },
                debug: process.env.NODE_ENV === "development",
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };