import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import { getTokenUser } from "./actions/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        const existingUser = await getTokenUser(token.sub);
        session.user.id = token.sub;
        session.user.role = existingUser?.data?.role || "USER";
      }

      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  ...authConfig,
});
