import axios from "axios";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

let adminCred: any = {
  fullname: "Gaurav Sekhri",
  role: "Admin",
  email: "gaurav.sekhri@e2eresearch.com",
  password: "Admin@12345",
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 1,
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password" },
      },
      async authorize(credentials, req) {
        // Perform database operations

        const user = adminCred;
        // console.log(user);

        if (user) {
          if (user.password == credentials?.password) {
            return user;
          } else {
            throw new Error("Invalid credentials.");
          }
        } else {
          throw new Error("User not found. Please register first.");
        }

        // const response: any = await axios.post("/api/users/login", credentials);

        // if (response.data.success) {
        //   toast.success("Login successful!");
        //   console.log(response);
        // } else {
        //   toast.error(response.data.message);
        //   console.log(response);
        // }

        // if (
        //   credentials?.email === adminCred.email &&
        //   credentials?.password === adminCred.password
        // ) {
        //   return {
        //     id: "1",
        //     fullname: adminCred.fullname,
        //     role: adminCred.role,
        //     email: adminCred.email,
        //   };
        // }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      // console.log(user);
      if (user) {
        token._id = user?._id;
        token.fullname = user?.firstName + " " + user?.lastName;
        token.email = user?.email;
        token.isAdmin = user?.isAdmin;
      }

      return token;
    },
    async session({ session, token }: any) {
      // console.log(token);
      if (token) {
        session.user._id = token._id;
        session.user.fullname = token.fullname;
        session.user.email = token.email;
        session.user.isAdmin = token.isAdmin;
      }

      return session;
    },
  },
  // callbacks: {
  //   jwt: ({ token, user }) => {
  //     if (user) {
  //       token.id = user.id;
  //       token.name = user.name;
  //       token.email = user.email;
  //     }
  //     return token;
  //   },
  //   session: ({ session, token }) => {
  //     if (token) {
  //       session = {
  //         ...session,
  //         user: { ...adminCred },
  //       };

  //       // console.log("token", token);
  //     }
  //     return session;
  //   },
  // },
};
