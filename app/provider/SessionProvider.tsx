"use client";
import { SessionProvider } from "next-auth/react";

interface NextAuthSessionProviderProps {
  children: React.ReactNode;
}
/*
Unfortunately, currentUser from getCurrentUser() becomes undefined
when the user is logged in.
Had to use SessionProvider to check if user is logged in or not.
*/
const NextAuthSessionProvider = ({
  children,
}: NextAuthSessionProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthSessionProvider;
