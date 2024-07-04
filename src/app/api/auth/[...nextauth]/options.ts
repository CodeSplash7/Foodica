import { getUserByEmail, getUsers } from "@/utils/serverside/userFunctions";
import { verifyPassword } from "@/utils/serverside/passwordFunctions";
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
    async session({ session, user, token }) {
      const appUser = await getUserByEmail(session.user?.email);
      if (!appUser) return undefined!;
      session.user = {
        name: appUser.profile.username,
        email: appUser.account.email,
        image:
          appUser.profile.profilePicture?.thumbnailUrl ??
          appUser.profile.profilePicture?.url ??
          null
      };
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    }
  }
};

export default options;
