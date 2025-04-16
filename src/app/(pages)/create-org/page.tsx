"use client";
import CreateOrgForm from "@/components/custom/create-org-form";
import { AppDispatch } from "@/store";
import { fetchAllOrganisations } from "@/store/slices/organisation/org-functions";
import { organisationSchema } from "@/types/org-types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

const Page = () => {
  const [open, setOpen] = useState(false);
  const navigate = useRouter();
  const dispatch = useDispatch<AppDispatch>()
  const onSubmit = async (data: z.infer<typeof organisationSchema>) => {
    const promise = () =>
      new Promise((resolve, reject) => {
        axios
          .post("/api/organisations", data)
          .then((res) => {
            console.log(res);
            if (!res.data?.success) {
              reject(res.data.message);
            } else {
              resolve(res.data.message); // Resolve with the full data object
            }
          })
          .catch((error) => reject("Something went wrong"));
      });

    toast.promise(promise, {
      loading: "Loading...",
      success: async (data: any) => {
        await dispatch(fetchAllOrganisations());
        navigate.push("/dashboard");
        return data.message || "Organisation successfully created";
      },
      error: (err) => `${err}`,
    });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <CreateOrgForm open={true} setOpen={setOpen} onSubmit={onSubmit} />
    </div>
  );
};

export default Page;
