import type { Metadata } from "next";
import "../../styles/landing.css";
import Navigation from "@/components/landing/navigation";
import Footer from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Umurava | Landing page",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navigation />
      {children}
      <Footer />
    </div>
  );
}
