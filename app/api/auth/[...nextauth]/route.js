// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { dbConnect } from "@/utils/dbConnect";
// import User from "@/models/User";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user }) {
//       await dbConnect();
//       const existingUser = await User.findOne({ email: user.email });

//       if (!existingUser) {
//         await User.create({ name: user.name, email: user.email, googleId: user.id });
//       }

//       return true;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { dbConnect } from "@/utils/dbConnect";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        await dbConnect();
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({ name: user.name, email: user.email, googleId: user.id });
        }

        return true;
      } catch (error) {
        console.error("Google sign-in error:", error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };