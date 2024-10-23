import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';
 
export const authConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // The 'authorized' callback should only return true or false to allow or deny access
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        return isLoggedIn ? true : false; // Allow access if logged in, otherwise deny
      }

      // For other pages, return true (allow access)
      return true;
    },
    
    // Use the 'redirect' callback to handle redirection after login
    async redirect({ url, baseUrl }) {
      const isDashboard = url.includes('/dashboard');
      if (isDashboard) {
        // Redirect to dashboard if it's part of the URL
        return `${baseUrl}/dashboard`;
      }
      // Default behavior: redirect to the base URL or continue with the original URL
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  providers: [],
} satisfies NextAuthConfig;