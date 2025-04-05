import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormWrapper from "./FormWrapper";
import { FormItems } from ".";

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  errors: Partial<FormItems>;
};

const TeamInfoForm = ({
  noOfPeoples,
  userEmails,
  sendEmails,
  updateForm,
}: StepProps) => {
  const addEmailField = () => {
    updateForm({ userEmails: [...userEmails, ""] });
  };

  const updateEmail = (index: number, value: string) => {
    const updatedEmails = [...userEmails];
    updatedEmails[index] = value;
    updateForm({ userEmails: updatedEmails });
  };

  const removeEmail = (index: number) => {
    const updatedEmails = [...userEmails];
    updatedEmails.splice(index, 1);
    updateForm({ userEmails: updatedEmails });
  };

  return (
    <FormWrapper
      title="Team Information"
      description="Provide details about your team members."
    >
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="noOfPeoples">Number of People</Label>
          <Input
            type="number"
            name="noOfPeoples"
            id="noOfPeoples"
            min={1}
            value={noOfPeoples}
            onChange={(e) =>
              updateForm({ noOfPeoples: Number(e.target.value) })
            }
            className="w-full"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Team Members’ Emails</Label>
          {userEmails.map((email, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                type="email"
                value={email}
                placeholder="e.g. teammate@company.com"
                onChange={(e) => updateEmail(index, e.target.value)}
                className="w-full"
                required
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeEmail(index)}
              >
                ✕
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addEmailField}>
            + Add Email
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={sendEmails}
            onCheckedChange={(checked) => updateForm({ sendEmails: !!checked })}
            id="sendEmails"
          />
          <Label htmlFor="sendEmails">Send invites to team members?</Label>
        </div>
      </div>
    </FormWrapper>
  );
};

export default TeamInfoForm;
