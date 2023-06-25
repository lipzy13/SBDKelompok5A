import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Masukkan username" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials){
                // check to see if username and password is there
                if(!credentials.username || !credentials.password){
                    throw new Error("Missing fields");
                }
                // check to see if username exist
                const user = await prisma.tabel_user.findFirst({
                    where: {
                        username: credentials.username
                    }
                });

                // if no user found
                if(!user){
                    throw new Error("No user found");
                }
                // check if password match
                const passwordMatch = await bcrypt.compare(credentials.password, user.password);

                if(!passwordMatch){
                    throw new Error("Incorrect password");
                }

                return user;
            },
        }), 
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.SECRET,
    callbacks: {
        session: async ({session, token}) => {
            if(session?.user) {
                session.user.username = token.username;
            }
            return session
        },
        jwt: async ({token, user}) => {
            if(user?.username) {
                token.username = user.username
            }
            return token
        }
    }     
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST} 