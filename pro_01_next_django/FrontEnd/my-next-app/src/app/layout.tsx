// src/app/layout.tsx
"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import global_style from "@/styles/globals.module.css";
import style_01 from "@/styles/style_01.module.css";
import ReduxProvider from "@/components/ReduxProvider";
import UserInactivityProvider from "@/components/UserInactivityProvider";
import { useEffect } from "react";
import { NextPage } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const RootLayout: NextPage<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js").catch((err) =>
      console.error("Failed to load Bootstrap JS:", err)
    );
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${global_style.global} ${style_01.style_01} antialiased`}
      >
        <ReduxProvider>
          <UserInactivityProvider>{children}</UserInactivityProvider>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;