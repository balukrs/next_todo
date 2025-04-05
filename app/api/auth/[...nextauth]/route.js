import NextAuth from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export const authOptions = {
  providers: [
    CredentialsProviders({
      name: "credentails",
      credentails: {},
      async authorize(credentails) {
        try {
          const { email, password } = credentails;
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) return null;

          const pwdcheck = await bcrypt.compare(password, user.password);

          if (!pwdcheck) return null;

          return user;
        } catch (error) {
          console.error(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
