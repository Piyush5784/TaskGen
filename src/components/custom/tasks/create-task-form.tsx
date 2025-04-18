"use client";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Projects } from "@prisma/client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const sectionTypes = [
  "design",
  "development",
  "bug fix",
  "improvement",
] as const;
const statuses = ["Done", "Completed", "In Progress", "Closed"] as const;
const taskTypes = [
  "Design",
  "Development",
  "Feature",
  "Bug",
  "Enhancement",
] as const;

const formSchema = z.object({
  name: z.string().min(1).min(3).max(50),
  description: z
    .string()
    .min(1, "Description should be ")
    .min(3)
    .max(200)
    .optional(),
  status: z.enum(statuses),
  reviewer: z.string().optional(),
  Type: z.enum(taskTypes),
});


export default function CreateTaskForm({ selectedProject }: { selectedProject: Projects | null }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!selectedProject) return;
      const promise = axios.post("/api/tasks", { ...values, projectId: selectedProject.id });

      toast.promise(promise, {
        loading: "Loading...",
        success: (response: any) => {
          return `${response.data.message}`;
        },
        error: "Error",
      });

      const res = await promise;
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg: Fix the navbar"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter the name of the task</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg: Use the shadcn navbar"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the description of the task
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="eg: Pending" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Select the status of the task</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reviewer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reviewer</FormLabel>
                <FormControl>
                  <Input placeholder="eg: Naruto" type="email" {...field} />
                </FormControl>
                <FormDescription>Enter the reviewer name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="eg: Development" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {taskTypes.map((sec) => (
                      <SelectItem key={sec} value={sec}>
                        {sec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Select the type of the task</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" onClick={() => console.log("click")}>
          Create
        </Button>
      </form>
    </Form>
  );
}
