"use client";
import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/store";
import { selectProject } from "@/store/slices/organisation/org-slice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuickCreate } from "../quick-create-dialog";

const SelectProject = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [projectId, setSelectedProjectId] = useState<string | null>(null);
  const { selectedProject, projects, loading } = useSelector(
    (root: RootState) => root.org
  );

  useEffect(() => {
    if (projectId) {
      const pToSelect = projects?.find((p) => p.id === projectId);
      if (pToSelect) {
        dispatch(selectProject(pToSelect));
        // updateOrganisation(selectedOrgId);
      }
      // dispatch(fetchOrgDetails(selectedOrgId));
      // dispatch(fetchProjects(selectedOrgId));
    }
  }, [projectId, dispatch]);

  if (loading) return <p>Loading...</p>; // Ensures UI waits for data

  if (!projects || projects.length === 0) return null;
  return (
    <div>
      {" "}
      <div className="flex flex-col items-start p-3 pl-0 gap-4 ">
        <Select
          onValueChange={(value) => setSelectedProjectId(value)}
          value={selectedProject?.id || undefined}
        >
          <SelectTrigger className="border w-[200px]">
            <SelectValue
              className="text-center border"
              placeholder={"Select Project"}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {projects.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectGroup>
            <QuickCreate type="secondary" />
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SelectProject;
