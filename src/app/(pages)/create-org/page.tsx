"use client";
import CreateOrgForm from "@/components/custom/create-org-form";
import { organisationSchema } from "@/types/org-types";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const Page = () => {
  const [open, setOpen] = useState(false);
  const onSubmit = async (data: z.infer<typeof organisationSchema>) => {
    try {
      const res = await axios.post("/api/create-organisation", data);
      if (!res.data?.success) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <CreateOrgForm open={true} setOpen={setOpen} onSubmit={onSubmit} />
    </div>
  );
};

export default Page;
