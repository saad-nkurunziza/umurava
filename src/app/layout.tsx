import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "../styles/globals.css";
import type React from "react";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/containers/theme-provider";
import AuthProvider from "@/components/containers/session-provider";

const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Umurava",
  description: "Build Work Experience through Skills Challenges",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${workSans.className} sidebar`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
