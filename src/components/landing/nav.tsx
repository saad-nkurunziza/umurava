"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/challenges-hackathons", label: "Challenge & Hackathons" },
  { href: "/for-learning-institutions", label: "For Educational Institutions" },
  { href: "/about-us", label: "About Us" },
  { href: "/contact-us", label: "Contact Us" },
];

const Nav = () => {
  const pathname = usePathname();

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
};

export default Nav;
