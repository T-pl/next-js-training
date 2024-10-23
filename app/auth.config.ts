import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';
 
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
        const baseUrl = process.env.NEXTAUTH_URL || nextUrl.origin; // Ensure we have a base URL
        const dashboardUrl = new URL('/dashboard', baseUrl); // Use the base URL or origin
        return NextResponse.redirect(dashboardUrl); 
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;