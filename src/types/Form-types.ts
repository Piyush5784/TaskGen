import { z } from "zod";

export type FormItems = {
  projectName: string;
  email: string;
  description: string;
  noOfPeoples: number;
  userEmails: string[];
  sendEmails: boolean;
};

export type StepProps = FormItems & {
  yearly: boolean;
  plan: string;
  addOns: [
    {
      checked: boolean;
      price: number;
      id: string;
      title: string;
    },
  ];
  goTo: (index: number) => void;
  updateForm?: (fieldToUpdate: Partial<FormItems>) => void;
};

export const statuses = ["Done", "Completed", "In Progress", "Closed"] as const;
export const taskTypes = [
  "Design",
  "Development",
  "Feature",
  "Bug",
  "Enhancement",
] as const;

export const formSchema = z.object({
  name: z.string().min(1).min(3).max(50),
  description: z
    .string()
    .min(1, "Description should be ")
    .min(3)
    .max(200)
    .optional(),
  status: z.enum(statuses),
  reviewer: z.string().optional(),
  type: z.enum(taskTypes),
});
