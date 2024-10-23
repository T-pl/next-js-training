import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; 
      } else if (isLoggedIn) {
        const baseUrl = process.env.NEXTAUTH_URL || 'https://next-js-training-prod.vercel.app'; 
        return Response.redirect(new URL('/dashboard', baseUrl));
      }
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;