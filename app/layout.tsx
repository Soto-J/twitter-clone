import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Sidebar from "./components/sidebar/Sidebar";
import Followbar from "./components/followbar/Followbar";
import ClientOnly from "./components/ClientOnly";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const onSubmit = () => {
    "use client";
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <LoginModal />
          <RegisterModal />
        </ClientOnly>

        <main className="container mx-auto h-full max-w-6xl xl:px-32">
          <div className="grid h-full grid-cols-4">
            <Sidebar />
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
            <div className="text-sky-500">section 4</div>
          </div>
        </main>
      </body>
    </html>
  );
}
