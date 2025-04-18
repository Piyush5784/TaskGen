import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircleIcon, PlusIcon } from "lucide-react";
import { SidebarMenuButton } from "../ui/sidebar";
import MultiStepForm from "./mutil-step-form";
import { Button } from "../ui/button";

type prop = {
  type?: "primary" | "secondary"
}

export function QuickCreate({ type }: prop) {
  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          {type == "secondary" ?
            <SidebarMenuButton
              tooltip="Create Project"
              className="border mt-1"
            >
              <PlusCircleIcon />
              <span>Create Project</span>
            </SidebarMenuButton>
            : <SidebarMenuButton
              tooltip="Quick Create"
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
              <PlusCircleIcon />
              <span>Quick Create</span>
            </SidebarMenuButton>}
        </DialogTrigger>
        <DialogContent className="max-w-full w-1/2 bg-none p-3">
          <MultiStepForm />
          {/* <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
