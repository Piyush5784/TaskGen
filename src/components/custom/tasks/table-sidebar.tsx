
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet"
import { Separator, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select"
import { Button } from "@/components/ui/button"
import { CartesianGrid, XAxis, Area, Label } from "recharts"
import { Task } from "./manual-task-table"
import { Dialog } from "@radix-ui/react-dialog"
import UpdateTaskForm from "./update-task.form"


export function ManualTaskTableSheet({ item }: { item: Task }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="link" className="w-fit px-0 text-left text-foreground pl-4">
                    {item.header}
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
                <SheetHeader className="gap-1">
                    <SheetTitle>{item.header}</SheetTitle>
                    <SheetDescription>
                        {item.description}
                    </SheetDescription>
                </SheetHeader>
                {/* @ts-expect-error */}
                <UpdateTaskForm initialData={item} />



                <SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
                    <Button className="w-full">Update</Button>
                    <SheetClose asChild>
                        <Button variant="outline" className="w-full">
                            Done
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
