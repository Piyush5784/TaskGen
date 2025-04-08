"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import FormWrapper from "./FormWrapper";
import { FormItems } from "@/types/Form-types";

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  errors: Partial<FormItems>;
};

const ProjectInfoForm = ({
  projectName,
  description,
  errors,
  updateForm,
}: StepProps) => {
  const { organisations, selectedOrg } = useSelector(
    (root: RootState) => root.org
  );
  return (
    <FormWrapper
      title="Project Info"
      description="Please provide your project name and a short description."
    >
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label className="selectOrganisation">Selected organisation</Label>
          <Input
            disabled={true}
            value={selectedOrg?.name || ""}
            className="border border-gray-500"
          />{" "}
        </div>
      </div>
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            autoFocus
            type="text"
            name="projectName"
            id="projectName"
            placeholder="e.g. Saffron AI"
            value={projectName}
            onChange={(e) => updateForm({ projectName: e.target.value })}
            className="w-full border border-gray-500"
            required
          />
          {errors.projectName && (
            <p className="text-red-500 text-sm">{errors.projectName}</p>
          )}
        </div>
        {/* <div className="flex flex-col gap-2">
          <Label htmlFor="email">Tech Stack</Label>
          <TechStackForm />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div> */}
        <div className="flex flex-col gap-2 ">
          <Label htmlFor="description">Project Description</Label>
          <Textarea
            name="description"
            id="description"
            placeholder="Briefly describe your project..."
            value={description}
            onChange={(e) => updateForm({ description: e.target.value })}
            className="w-full border border-gray-500 "
            required
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>
      </div>
    </FormWrapper>
  );
};

export default ProjectInfoForm;
