import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Briefcase, Code, Users } from "lucide-react";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center border-2 selection:bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden border-2">
            <CardContent className="grid p-0 md:grid-cols-2">
              {children}
              <div className="relative hidden p-6 bg-muted/70 md:block">
                <div className="flex flex-col justify-between p-8">
                  <div>
                    <h1 className="font-semibold mb-3">Umurava</h1>
                    <p className="mb-8 text-muted-foreground">Learn by Doing</p>
                    <div className="space-y-6">
                      <div className="flex items-center text-sm">
                        <Code className="mr-2 w-3.5 h-3.5" />
                        <span>Tackle industry-inspired projects</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Briefcase className="mr-2 w-3.5 h-3.5" />
                        <span>Build a portfodivo that stands out</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="mr-2 w-3.5 h-3.5" />
                        <span>Connect with top companies</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-12">
                    <Link
                      href="#"
                      className="inline-flex items-center text-sm font-medium hover:underline"
                    >
                      Learn more about our challenges
                      <ArrowRight className="ml-1 w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking continue, you agree to our{" "}
            <Link href="#">Terms of Service</Link> and{" "}
            <Link href="#">Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </div>
  );
}
