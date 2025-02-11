"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/challenges-hackathons", label: "Challenge & Hackathons" },
  { href: "/for-learning-institutions", label: "For Educational Institutions" },
  { href: "/about-us", label: "About Us" },
  { href: "/contact-us", label: "Contact Us" },
];

const Nav = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="text-left mb-8">
            <SheetTitle className="text-xs text-muted-foreground">
              Navigation
            </SheetTitle>
          </SheetHeader>

          <nav className="inline-flex flex-col font-medium text-sm text-secondary-foreground gap-4 whitespace-nowrap relative list-none">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  pathname === link.href ? "text-primary" : "hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="relativeflex-[0_0_auto] mt-2">
              <Button asChild>
                <Link href="/dashboard">Join the Program</Link>
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    );
  } else {
    return (
      <nav className="inline-flex font-medium text-sm text-secondary-foreground items-center gap-8 whitespace-nowrap relative flex-[0_0_auto] list-none">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${
              pathname === link.href ? "text-primary" : "hover:text-primary"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    );
  }
};

export default Nav;
