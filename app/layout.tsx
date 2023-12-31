import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import getCurrentUser from "./actions/getCurrentUser";
import NextAuthSessionProvider from "./provider/SessionProvider";
import ClientOnly from "./components/ClientOnly";

import Sidebar from "./components/sidebar/Sidebar";
import Followbar from "./components/followbar/Followbar";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import ToastProvider from "./provider/ToastProvider";
import EditModal from "./components/modals/EditModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <NextAuthSessionProvider>
        <body className={inter.className}>
          <ClientOnly>
            <LoginModal />
            <RegisterModal />
            <EditModal />
            <ToastProvider />
          </ClientOnly>

          <main className="container mx-auto h-full max-w-6xl xl:px-24">
            <div className="grid h-full grid-cols-4">
              <Sidebar currentUser={currentUser} />
              <div
                className="
                  col-span-3
                  border-x
                  border-neutral-800
                  lg:col-span-2
                "
              >
                {children}
              </div>
              <Followbar />
            </div>
          </main>
        </body>
      </NextAuthSessionProvider>
    </html>
  );
}
