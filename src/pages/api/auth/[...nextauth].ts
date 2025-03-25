import NextAuth, { NextAuthOptions, Account, Session, User } from "next-auth";
import IdentityServer4Provider from "next-auth/providers/identity-server4";
import { decode, JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    IdentityServer4Provider({
      id: "identityserver",
      name: "IdentityServer",
      clientId: "4b25-637664417048491244.apps.smartcaapi.com",
      clientSecret: "Nzk2M2QyODQ-NTIyMi00YjI1",
      issuer: "https://rmidp.vnptit.vn",
      //   authorization: { params: { scope: "openid profile email" } },
      authorization: {
        url: "https://rmidp.vnptit.vn/connect/authorize",
        params: {
          // client_id: process.env.IDENTITY_SERVER_CLIENT_ID,
          redirect_uri:
            "http://localhost:44348/api/auth/callback/identityserver",
          response_type: "code",
          scope: "openid profile email sign offline_access",
          code_challenge_method: "S256",
          response_mode: "form_post",
        },
      },
      token: "https://rmidp.vnptit.vn/connect/token",
      userinfo: "https://rmidp.vnptit.vn/connect/userinfo",
      checks: ["none"],
    }),
  ],
  cookies: {
    state: {
      name: "next-auth.state",
      options: {
        httpOnly: true,
        sameSite: "lax", // // Hoặc "none" nếu dùng HTTPS
        secure: false, // process.env.NODE_ENV === "production",
        //  path: "/",
      },
    },
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "lax", // Nếu dùng HTTPS
        secure: false, //process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({
      token,
      account,
    }: {
      token: JWT;
      account: Account | null; // ✅ Hỗ trợ null để tránh lỗi
    }) {
      console.log("account-response", account);
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;

        try {
          // 🛠 Gọi API `/connect/userinfo`
          const res = await fetch(
            `${process.env.IDENTITY_SERVER_ISSUER}/connect/userinfo`,
            {
              headers: {
                Authorization: `Bearer ${account.access_token}`,
              },
            }
          );
          console.log("userinfo-response", res);
          if (!res.ok) throw new Error("Failed to fetch user info");

          const userInfo = await res.json();
          console.log("🔹 UserInfo from IdentityServer:", userInfo);

          token.name =
            userInfo.name ||
            userInfo.FullName ||
            userInfo.full_name ||
            "Unknown User";
          token.email =
            userInfo.email || userInfo.Email || userInfo.email_address;
          token.picture =
            userInfo.picture || userInfo.avatar || userInfo.Avatar;
          token.role =
            userInfo.role || userInfo.Role || userInfo.roles || "user";
        } catch (error) {
          console.error("❌ Error fetching user info:", error);
        }
      }
      console.log("token-response", token);
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("sessionUSer", session);
      console.log("🔹 Session data:", session);
      console.log("🔹 Token data:", token);

      // Cập nhật lại dữ liệu session từ token
      session.user = {
        name: token.name,
        email: token.email,
        image: token.picture,
      };

      session.accessToken = token.accessToken as string;

      return session;
    },
  },
  pages: {
    signOut: `https://rmidp.vnptit.vn/connect/endsession?post_logout_redirect_uri=${process.env.NEXTAUTH_URL}`,
  },
};

export default NextAuth(authOptions);
