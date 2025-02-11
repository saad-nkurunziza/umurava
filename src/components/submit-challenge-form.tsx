"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { submitFormSchema } from "@/utils/zod-types";
import { toast } from "sonner";
import { makeSubmission } from "@/lib/actions/submissions";

export function SubmitChallengeForm({ challengeId }: { challengeId: string }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof submitFormSchema>>({
    resolver: zodResolver(submitFormSchema),
    defaultValues: {
      codebaseLink: "",
      moreInfo: "",
    },
  });

  async function onSubmit(values: z.infer<typeof submitFormSchema>) {
    try {
      const res = await makeSubmission(challengeId, values);
      if (typeof res === "object" && "data" in res) {
        toast("Challenge edited!", {
          description: "Your new challenge has been successfully edited.",
        });
        router.back();
      } else {
        toast("Error", {
          description: "There was a problem creating your challenge.",
        });
      }
    } catch (error) {
      console.error(error);
      toast("Error", {
        description: "There was a problem creating your challenge.",
      });
    }
  }

  return (
    <div className="min-h-screen">
      <Card className="mx-auto p-6 rounded-2xl shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="codebaseLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Codebase link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/username/repositry"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="moreInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>More info</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="More details if there is"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="flex-1"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="animate-spin" />
              )}
              {form.formState.isSubmitting ? "Wait..." : "Submit"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
