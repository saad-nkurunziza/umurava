import { UserRole } from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { type DefaultSession } from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       role?: UserRole;
//     } & DefaultSession["user"];
//   }
// }

export declare module "next-auth" {
  interface User {
    role?: UserRole;
    id: string;
  }
  interface Session {
    user: User;
  }
}
