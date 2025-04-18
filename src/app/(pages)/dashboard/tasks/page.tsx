"use client";

import { DataTable } from "@/components/custom/data-table";
import CreateTaskForm from "@/components/custom/tasks/create-task-form";
import ManualTaskTable from "@/components/custom/tasks/manual-task-table";
import SelectProject from "@/components/custom/tasks/select-project";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AppDispatch, RootState } from "@/store";
import { fetchTasks } from "@/store/slices/organisation/org-functions";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

const Tasks = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();



  const { selectedProject, projects, loading, tasks } = useSelector(
    (root: RootState) => root.org,
  );

  React.useEffect(() => {
    async function fetch() {
      if (selectedProject && !loading) {
        await dispatch(fetchTasks(selectedProject?.id));
      }
    }
    fetch();
  }, [selectedProject]);
  const formattedTasks = React.useMemo(() => {
    return tasks?.map((task) => ({
      id: task.id,
      header: task.name,
      status: String(task.status),
      reviewer: String(task.reviewer),
      type: String(task.typeOfUpdate),
    })) ?? [];
  }, [tasks, selectedProject]);
  const [initialTasks, setTasks] = React.useState<typeof formattedTasks | []>([]);


  React.useEffect(() => {
    setTasks(formattedTasks);

    console.log("called")
  }, [formattedTasks, selectedProject]);



  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold ">Tasks</h1>

        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant={"outline"}>Create Task</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              {projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 opacity-60 pointer-events-none">
                  <p className="text-center font-medium mb-2">
                    Create a project first before creating a new task
                  </p>
                  <p className="text-xs text-muted-foreground text-center">
                    You need at least one project to create tasks
                  </p>
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

                  <CreateTaskForm selectedProject={selectedProject} />
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <SelectProject />
      {selectedProject && <ManualTaskTable isLoading={loading} tasks={initialTasks} />}
    </div>
  );
};

export default Tasks;
