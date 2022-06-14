import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "../../../prisma";
import md5 from "md5";
export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "adminSignIn",
      name: "Credential",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "sweeta@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const login = await db.accounts.count({
          where: {
            email: credentials.email,
            password: md5(credentials.password),
          },
        });
        if (login > 0) {
          let profile = await db.accounts.findFirst({
            where: {
              email: credentials.email,
              password: md5(credentials.password),
            },
          });

          return profile;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.id;
        session.user = token;
      }
      return session;
    },
  },
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },
});
