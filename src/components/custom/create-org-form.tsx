"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { organisationSchema } from "@/types/org-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import LocationSelector from "../ui/location-input";
import { Textarea } from "../ui/textarea";

interface CreateOrgFormProps {
  onSubmit: (data: z.infer<typeof organisationSchema>) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateOrgForm = ({ onSubmit, open, setOpen }: CreateOrgFormProps) => {
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [countryName, setCountryName] = useState<string>("");
  const [stateName, setStateName] = useState<string>("");
  const methods = useForm({
    resolver: zodResolver(organisationSchema),
    defaultValues: {
      orgType: "",
      otherType: "",
    },
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const handleFormSubmit = async (data: z.infer<typeof organisationSchema>) => {
    if (orgType === "other" && (!data.otherType || data.otherType.length < 3)) {
      toast("Organisation type is required", {
        description: "Please define the type of Organisation to continue",
      });
      return;
    }
    onSubmit(data);
  };

  const orgType = watch("orgType");
  return (
    <>
      <FormProvider {...methods}>
        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-black p-10 rounded-xl border w-1/2"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div>
            <Label htmlFor="org-name">Organisation Name *</Label>
            <Input
              id="org-name"
              placeholder="Enter organisation name"
              {...register("orgName")}
            />
            {errors.orgName && (
              <p className="text-red-500 text-sm">{errors.orgName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="org-type">Organisation Type *</Label>
            <Select
              value={orgType}
              onValueChange={(value) => {
                setValue("orgType", value, { shouldValidate: true });
                setShowOtherInput(value === "other");
              }}
            >
              <SelectTrigger id="org-type">
                <SelectValue placeholder="Select organisation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="non-profit">Non-Profit</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
                <SelectItem value="government">Government</SelectItem>
                <SelectItem value="educational">Educational</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.orgType && (
              <p className="text-red-500 text-sm">{errors.orgType.message}</p>
            )}
            {showOtherInput && (
              <div className="mt-2">
                <Label htmlFor="other-type">Specify Other</Label>
                <Input
                  id="other-type"
                  placeholder="Enter organisation type"
                  {...register("otherType")}
                />
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter description (optional)"
              {...register("description")}
            />
          </div>
          <div>
            <Label htmlFor="size">Organisation Size *</Label>
            <Select
              onValueChange={(value) =>
                setValue("size", value, { shouldValidate: true })
              }
              value={watch("size")}
            >
              <SelectTrigger id="size">
                <SelectValue placeholder="Select organisation size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10</SelectItem>
                <SelectItem value="11-50">11-50</SelectItem>
                <SelectItem value="50-200">50-200</SelectItem>
                <SelectItem value="200-500">200-500</SelectItem>
                <SelectItem value="500+">500+</SelectItem>
              </SelectContent>
            </Select>
            {errors.size && (
              <p className="text-red-500 text-sm">{errors.size.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="contact-email">Contact Email *</Label>
            <Input
              id="contact-email"
              type="email"
              placeholder="Enter contact email"
              {...register("contactEmail")}
            />
            {errors.contactEmail && (
              <p className="text-red-500 text-sm">
                {errors.contactEmail.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="contact-phone">Contact Phone *</Label>
            <Input
              id="contact-phone"
              type="tel"
              placeholder="Enter contact phone"
              {...register("contactPhone")}
            />
            {errors.contactPhone && (
              <p className="text-red-500 text-sm">
                {errors.contactPhone.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <div>
              <Label>Select Country</Label>
            </div>
            <LocationSelector
              onCountryChange={(country) => {
                const newCountry = country?.name || "";
                setCountryName(newCountry);
                console.log(newCountry);
                setValue(
                  "location",
                  [newCountry || countryName, stateName || ""],
                  {
                    shouldValidate: true,
                  }
                );
              }}
              // onStateChange={(state) => {
              //   const newState = state?.name || "";
              //   setStateName(newState);
              //   setValue("location", [countryName, newState || stateName], {
              //     shouldValidate: true,
              //   });
              // }}
            />{" "}
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location?.message}</p>
            )}
          </div>{" "}
          <div className="sm:col-span-2 flex gap-3 justify-end">
            <Button type="submit" variant="default">
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default CreateOrgForm;
