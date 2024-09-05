import { getUserByEmail, getUsers } from "@/server-utils/userFunctions";
import { verifyPassword } from "@/server-utils/passwordFunctions";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options: AuthOptions = {
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "", // Hex color code
    logo: "", // Absolute URL to image
    buttonText: "" // Hex color code
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Type username..."
        },
        email: { label: "Email", type: "email", placeholder: "Type email..." },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Type password..."
        }
      },
      async authorize(credentials, req) {
        const appUser = await getUserByEmail(credentials?.email);
        if (!appUser) return null;

        const correctInformation =
          appUser?.profile.username === credentials?.username;
        if (!correctInformation) return null;

        const password = appUser.account.password;
        const correctPassword = await verifyPassword(
          credentials.password,
          password.salt,
          password.hash
        );
        if (!correctPassword) return null;

        return {
          id: String(appUser.id),
          email: credentials?.email,
          name: credentials?.username
        };
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const users = await getUsers();
      const appUser = users.find(
        (u) =>
          u.account.email === user.email && u.profile.username === user.name
      );
      return appUser ? true : false;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      session.user = {
        name: token.name,
        email: token.email,
        image: null
      };
      return session;
    },
    async jwt({ token, user }) {
      const appUser = await getUserByEmail(token.email);
      if (appUser) {
        token.name = appUser.profile.username;
        token.email = appUser.account.email;
      }
      return token;
    }
  }
};

export default options;
