import React from "react";
import Link from "next/link";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MapPin, Mail, Phone } from "lucide-react";
import {
  FaWhatsapp,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import ThemeToggler from "./theme-toggler";
import Image from "next/image";

const socialLinks = [
  {
    icon: <FaWhatsapp size={20} />,
    href: "https://wa.me/0790963467",
  },
  {
    icon: <FaTwitter size={20} />,
    href: "https://twitter.com/your-handle",
  },
  {
    icon: <FaFacebookF size={20} />,
    href: "https://facebook.com/your-page",
  },
  {
    icon: <FaInstagram size={20} />,
    href: "https://instagram.com/your-handle",
  },
];

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const contactInfo = [
  {
    icon: <MapPin className="h-5 w-5" />,
    text: "123 Business Street, Kigali, Rwanda",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    text: "contact@umurava.com",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    text: "+250 788 123 456",
  },
];

export default function Footer() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-md pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1280px]">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between mb-12">
          <Link href="/">
            <Image
              className="relative"
              width={125}
              height={24}
              alt="Umurava logo"
              src={"/logo.png"}
            />
          </Link>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Address</h3>
            <div className="flex flex-col gap-3 text-muted-foreground">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-3">
                  {info.icon}
                  <span>{info.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold  mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold  mb-4">Newsletter</h3>
            <p className="text-foreground/80 mb-4">
              Subscribe to get the latest updates.
            </p>

            <div className="relative p-2 flex items-center border rounded-md">
              <Input
                className="pe-2 border-none shadow-none focus:ring-none focus:outline-none focus-visible:ring-none focus-visible:outline-none"
                placeholder="Email"
                type="email"
                aria-label="Newsletter subscription"
              />
              <Button className="" aria-label="Subscribe">
                Subscribe
              </Button>
            </div>

            <div className="mt-4">
              <ThemeToggler />
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <span>
            © {new Date().getFullYear()} Umurava. All rights reserved.
          </span>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
