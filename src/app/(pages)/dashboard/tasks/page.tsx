"use client";

import { DataTable } from "@/components/custom/data-table";
import CreateTaskForm from "@/components/custom/tasks/create-task-form";
import SelectProject from "@/components/custom/tasks/select-project";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RootState } from "@/store";
import * as React from "react";
import { useSelector } from "react-redux";

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
  const { selectedProject, projects, loading } = useSelector(
    (root: RootState) => root.org
  );
  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold pl-8">Tasks</h1>

        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant={"outline"}>Create Task</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              {projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 opacity-60 pointer-events-none">
                  <p className="text-center font-medium mb-2">Create a project first before creating a new task</p>
                  <p className="text-xs text-muted-foreground text-center">You need at least one project to create tasks</p>
                </div>
              ) : (
                <>
                  <DialogHeader className="flex items-start">
                    <DialogTitle>Create New Task</DialogTitle>
                    <div className="pt-4 text-xs text-start flex gap-2 flex-col text-muted-foreground">
                      <SelectProject />
                      Select the correct project
                    </div>
                  </DialogHeader>

                  <CreateTaskForm />
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <DataTable data={tasks} />
    </div>
  );
};

export default Tasks;
