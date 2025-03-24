import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import CreateOrgForm from "./create-org-form";
import { organisationSchema } from "@/types/org-types";

export function SelectOrg() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = async (data: z.infer<typeof organisationSchema>) => {
    console.log("Submitting..........");
    console.log(data);

    toast.success("Organisation created successfully!");
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          Create Organisation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Organisation</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new organisation.
          </DialogDescription>
        </DialogHeader>

        {/* Wrap form inside FormProvider */}
        <CreateOrgForm
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
          onSubmit={onSubmit}
        />
        <div className="sm:col-span-2">
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
