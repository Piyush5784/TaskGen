import FormWrapper from "./FormWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormItems } from "../app/page";

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  errors: Partial<FormItems>;
};

const UserInfoForm = ({
  projectName,
  email,
  description,
  errors,
  updateForm,
}: StepProps) => {
  return (
    <FormWrapper
      title="Project Info"
      description="Please provide your project name and a short description."
    >
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
            className="w-full"
            required
          />
          {errors.projectName && (
            <p className="text-red-500 text-sm">{errors.projectName}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="e.g. stephenking@lorem.com"
            value={email}
            className="w-full"
            onChange={(e) => updateForm({ email: e.target.value })}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Project Description</Label>
          <Textarea
            name="description"
            id="description"
            placeholder="Briefly describe your project..."
            value={description}
            onChange={(e) => updateForm({ description: e.target.value })}
            className="w-full"
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

export default UserInfoForm;
