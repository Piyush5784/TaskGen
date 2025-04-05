"use client";

import { DataTable } from "@/components/custom/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";

const Tasks = () => {
  const [open, setOpen] = React.useState(false);
  const [tasks, setTasks] = React.useState([
    {
      id: 1,
      header: "Task 1",
      type: "Design",
      status: "In Progress",
      target: "10",
      limit: "20",
      reviewer: "Assign reviewer",
    },
    {
      id: 2,
      header: "Table of contents",
      type: "Table of contents",
      status: "Done",
      target: "29",
      limit: "24",
      reviewer: "Eddie Lake",
    },
  ]);

  const [newTask, setNewTask] = React.useState({
    header: "",
    type: "New",
    target: "0",
    limit: "0",
  });

  const handleAddTask = () => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: tasks.length + 1,
        header: newTask.header || `Task ${tasks.length + 1}`,
        type: newTask.type,
        status: "Not Started",
        target: newTask.target,
        limit: newTask.limit,
        reviewer: "Assign reviewer",
      },
    ]);
    setNewTask({ header: "", type: "New", target: "0", limit: "0" });
    setOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Tasks</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Create Task</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="header" className="text-right">
                  Title
                </Label>
                <Input
                  id="header"
                  className="col-span-3"
                  value={newTask.header}
                  onChange={(e) =>
                    setNewTask({ ...newTask, header: e.target.value })
                  }
                  placeholder={`Task ${tasks.length + 1}`}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  value={newTask.type}
                  onValueChange={(value) =>
                    setNewTask({ ...newTask, type: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="target" className="text-right">
                  Target
                </Label>
                <Input
                  id="target"
                  className="col-span-3"
                  value={newTask.target}
                  onChange={(e) =>
                    setNewTask({ ...newTask, target: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="limit" className="text-right">
                  Limit
                </Label>
                <Input
                  id="limit"
                  className="col-span-3"
                  value={newTask.limit}
                  onChange={(e) =>
                    setNewTask({ ...newTask, limit: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddTask}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable data={tasks} />
    </div>
  );
};

export default Tasks;
