import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import NextAuth, { DefaultSession } from "next-auth";

import { db } from "@/server/db";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      canUseAI: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
    canUseAI: boolean;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      profile(profile) {
        console.log("here i got the profile data", profile);
        return { role: profile.role ?? "user", ...profile };
      },
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
});
