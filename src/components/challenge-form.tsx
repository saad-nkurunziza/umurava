"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  CalendarIcon,
  DollarSignIcon,
  CheckIcon,
  User,
  FileText,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { challengeFormSchema } from "@/utils/zod-types";
import { createChallenge } from "@/lib/actions/challenges";
import { ListInput } from "./ui/list-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const steps = [
  {
    id: "basic",
    name: "Basic Info",
    icon: <User className="w-4 h-4" />,
    details: "Fill in the basic information",
  },
  {
    id: "details",
    name: "Details",
    icon: <FileText className="w-4 h-4" />,
    details: "Add detailed description",
  },
  {
    id: "requirements",
    name: "Requirements",
    icon: <CheckCircle className="w-4 h-4" />,
    details: "Set skills, level, and requirements",
  },
  {
    id: "review",
    name: "Review",
    icon: <CheckCircle className="w-4 h-4" />,
    details: "Review and submit your challenge",
  },
];

export function ChallengeForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState("basic");
  const form = useForm<z.infer<typeof challengeFormSchema>>({
    resolver: zodResolver(challengeFormSchema),
    defaultValues: {
      title: "",
      projectDescription: "",
      projectBrief: "",
      projectTasks: [],
      requirements: [],
      skills: [],
      level: "Junior",
      prize: 0,
      status: "Open",
      maxParticipants: 0,
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const basicInfoWatch = ["title", "startDate", "endDate", "prize"];
  const detailsWatch = ["projectBrief", "projectDescription", "projectTasks"];
  const requirementsWatch = [
    "skills",
    "level",
    "requirements",
    "maxParticipants",
  ];

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);
  const { isSubmitting } = form.formState;

  const basicInfoError = basicInfoWatch.some(
    (field) =>
      form.getFieldState(field as "title" | "startDate" | "endDate" | "prize")
        .invalid
  );
  const detailsError = detailsWatch.some(
    (field: string) =>
      form.getFieldState(
        field as "projectBrief" | "projectDescription" | "projectTasks"
      ).invalid
  );
  const requirementsError = requirementsWatch.some(
    (field: string) =>
      form.getFieldState(
        field as "skills" | "level" | "requirements" | "maxParticipants"
      ).invalid
  );

  // const basicInfoError = basicInfoWatch.some(
  //   (field: string) => field in dirtyFields
  // );
  // const detailsError = detailsWatch.some(
  //   (field: string) => field in dirtyFields
  // );
  // const requirementsError = requirementsWatch.some(
  //   (field: string) => field in dirtyFields
  // );

  async function onSubmit(values: z.infer<typeof challengeFormSchema>) {
    try {
      const res = await createChallenge(values);

      if (res.data) {
        toast("Challenge created!", {
          description: "Your new challenge has been successfully created.",
          action: (
            <Button
              size="sm"
              variant={"secondary"}
              onClick={() => router.back()}
            >
              Go back
            </Button>
          ),
        });
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
    <div className="min-h-screen space-y-8">
      {/* Steps */}
      <div className="">
        <div className={`flex items-center gap-4`}>
          {steps.map((step, index) => (
            <Fragment key={step.id}>
              <div
                className={cn(
                  "flex items-start gap-5 py-3.5 px-6 rounded-md",
                  currentStepIndex == index || index < currentStepIndex
                    ? "bg-primary/10 border-primary text-primary"
                    : "border bg-background/60 text-muted-foreground"
                )}
              >
                <div className="flex items-center gap-2">
                  {index < currentStepIndex ? (
                    <CheckIcon className="h-5 w-5 text-primary" />
                  ) : (
                    <div className="rounded-full flex items-center justify-center">
                      {step.icon}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-medium leading-none">
                    {step.name}
                  </h3>
                  <p
                    className={cn(
                      "text-xs ",
                      currentStepIndex == index || index < currentStepIndex
                        ? "text-primary/80"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.details}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <Separator
                  className={cn(
                    "h-[2px] w-16",
                    currentStepIndex > index
                      ? "bg-primary/10"
                      : "bg-transparent"
                  )}
                  orientation="horizontal"
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>

      <Card className="mx-auto p-6 rounded-2xl shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {currentStep === "basic" && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Challenge Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter challenge title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < form.getValues("startDate") ||
                                date > new Date("2100-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="prize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prize Money</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSignIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                              placeholder="e.g., 1000"
                              {...field}
                              className="pl-11"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  disabled={basicInfoError}
                  onClick={() => setCurrentStep("details")}
                  className="w-full"
                >
                  Continue to Challenge Details
                </Button>
              </div>
            )}

            {currentStep === "details" && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="projectBrief"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Brief</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Short project brief"
                          className="resize-none min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription
                        className={`text-right ${
                          field.value.length > 50
                            ? "text-red-600 dark:text-red-700"
                            : ""
                        }`}
                      >
                        {field.value.length}/50 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projectDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief description of the project"
                          className="resize-none min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription
                        className={`text-right ${
                          field.value.length > 50
                            ? "text-red-600 dark:text-red-700"
                            : ""
                        }`}
                      >
                        {field.value.length}/250 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projectTasks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Tasks</FormLabel>
                      <FormControl>
                        <ListInput
                          placeholder="List of tasks for the project"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep("basic")}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    disabled={detailsError}
                    onClick={() => setCurrentStep("requirements")}
                    className="flex-1"
                  >
                    Continue to Requirements
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "requirements" && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills</FormLabel>
                      <FormControl>
                        <ListInput
                          placeholder="Enter required skills"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Level</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Enter challenge level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Junior">Junior</SelectItem>
                            <SelectItem value="Intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="Senior">Senior</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Requirements</FormLabel>
                      <FormControl>
                        <ListInput
                          placeholder="Add your challenge requirements"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxParticipants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Participants</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter maximum participants"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep("details")}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    disabled={requirementsError}
                    onClick={() => setCurrentStep("review")}
                    className="flex-1"
                  >
                    Continue to Review
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "review" && (
              <div className="space-y-6">
                <div className="rounded-2xl border bg-gray-50 dark:bg-neutral-900 p-6 space-y-4">
                  {Object.entries(form.getValues()).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">
                        {key.charAt(0).toUpperCase() +
                          key.slice(1).replace(/([A-Z])/g, " $1")}
                      </div>
                      <div className="text-base">
                        {value instanceof Date
                          ? format(value, "PPP")
                          : Array.isArray(value)
                          ? value.join(", ")
                          : value || "Not provided"}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep("requirements")}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button type="submit" className="flex-1">
                    {isSubmitting && <Loader2 className="animate-spin" />}
                    {isSubmitting
                      ? "Creating Challenge..."
                      : "Create Challenge"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>
      </Card>
    </div>
  );
}
