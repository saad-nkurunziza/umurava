import type { Metadata } from "next";
import ContactForm from "./contact-form";
import { MapPin, Phone, Mail } from "lucide-react";
import SectionTitle from "@/components/landing/section-title";

export const metadata: Metadata = {
  title: "Contact Us | Umurava",
  description: "Get in touch with Umurava for any questions or inquiries.",
};

export default function page() {
  return (
    <main>
      <section>
        <SectionTitle
          title="Get in Touch"
          subtitle=" Have questions about our challenges or want to learn more about Umurava? We're here to help! Fill out the
            form, and we'll get back to you as soon as possible."
        />

        <div className="grid grid-cols-2 gap-16">
          <ContactForm />
          <div className="flex flex-col gap-2">
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-3" />
                  <span>123 Business Street, Kigali, Rwanda</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <span>+250 123 456 789</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <span>contact@umurava.com</span>
                </div>
              </div>
            </div>

            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground">Map Placeholder</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
