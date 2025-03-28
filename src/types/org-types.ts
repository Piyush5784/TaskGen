import { z } from "zod";

export const organisationSchema = z.object({
  orgName: z.string().min(1, "Organisation Name is required"),
  orgType: z.string().min(1, "Organisation Type is required"),
  otherType: z.string().optional().or(z.literal("")),
  description: z.string().optional(),
  size: z.string().min(1, "Organisation Size is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z
    .string()
    .regex(/^\d{8,}$/, "Contact Phone must have at least 8 digits"),
  location: z.tuple([
    z
      .string({
        required_error: "Country is required",
      })
      .min(1, "Country is required"),
    z.string().optional(),
  ]),
});

export type Organisation = z.infer<typeof organisationSchema>;
