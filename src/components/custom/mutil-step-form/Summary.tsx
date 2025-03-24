import { FormItems } from "../app/page";
import FormWrapper from "./FormWrapper";

type SummaryProps = FormItems;

const Summary = ({
  projectName,
  email,
  description,
  noOfPeoples,
  userEmails,
  sendEmails,
}: SummaryProps) => {
  return (
    <FormWrapper
      title="Summary"
      description="Review your project and team details before submission."
    >
      <div className="w-full flex flex-col gap-5 text-white bg-[#1E1E1E] p-6 rounded-lg shadow-md border border-neutral-700">
        <h3 className="font-semibold text-lg text-[#ffe666] mb-2">
          📋 Project & Team Overview
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {/* Project Details */}
          <div className="bg-neutral-800 p-4 rounded-md border border-neutral-700">
            <p className="text-neutral-400">
              📌 <span className="font-medium text-white">Project Name:</span>
            </p>
            <p className="text-white">{projectName || "Not provided"}</p>
          </div>

          <div className="bg-neutral-800 p-4 rounded-md border border-neutral-700">
            <p className="text-neutral-400">
              📝 <span className="font-medium text-white">Description:</span>
            </p>
            <p className="text-white">{description || "Not provided"}</p>
          </div>

          <div className="bg-neutral-800 p-4 rounded-md border border-neutral-700">
            <p className="text-neutral-400">
              📧 <span className="font-medium text-white">Admin Email:</span>
            </p>
            <p className="text-white">{email}</p>
          </div>

          {/* Team Details */}
          <div className="bg-neutral-800 p-4 rounded-md border border-neutral-700">
            <p className="text-neutral-400">
              👥 <span className="font-medium text-white">Team Members:</span>
            </p>
            <p className="text-white">{noOfPeoples}</p>
          </div>

          <div className="bg-neutral-800 p-4 rounded-md border border-neutral-700">
            <p className="text-neutral-400">
              📩{" "}
              <span className="font-medium text-white">
                Send Invite Emails:
              </span>
            </p>
            <p
              className={`font-semibold ${
                sendEmails ? "text-green-400" : "text-red-400"
              }`}
            >
              {sendEmails ? "Yes" : "No"}
            </p>
          </div>

          {/* Team Member Emails */}
          {/* <div className="bg-neutral-800 p-4 rounded-md border border-neutral-700 col-span-1 md:col-span-2">
            <p className="text-neutral-400">
              📧{" "}
              <span className="font-medium text-white">
                Team Member Emails:
              </span>
            </p>
            {userEmails.length > 0 ? (
              <ul className="text-white mt-2 space-y-1">
                {userEmails.map((email, index) => (
                  <li key={index} className="flex items-center gap-2">
                    🔹 {email}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-neutral-400 mt-2">No team members added</p>
            )}
          </div> */}
        </div>
      </div>
    </FormWrapper>
  );
};

export default Summary;
