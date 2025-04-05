"use client";

import { Button } from "@/components/ui/button";
import { useMultiplestepForm } from "@/hooks/useMultiplestepForm";
import { AppDispatch, RootState } from "@/store";
import { fetchProjects } from "@/store/slices/organisation/org-functions";
import axios from "axios";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import SideBar from "./SideBar";
import SuccessMessage from "./SuccessMessage";
import Summary from "./Summary";
import ProjectInfoForm from "./project-info-form";

export type FormItems = {
  projectName: string;
  email: string;
  description: string;
  noOfPeoples: number;
  userEmails: string[];
  sendEmails: boolean;
};

const initialValues: FormItems = {
  projectName: "",
  email: "",
  description: "",
  noOfPeoples: 0,
  userEmails: [],
  sendEmails: false,
};

export default function MultiStepForm() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { selectedOrg } = useSelector((root: RootState) => root.org);
  const dispath = useDispatch<AppDispatch>();
  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goTo,
    showSuccessMsg,
  } = useMultiplestepForm(2); // Updated to 3 steps

  function updateForm(fieldToUpdate: Partial<FormItems>) {
    setFormData((prev) => ({ ...prev, ...fieldToUpdate }));
  }

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    const newErrors: Record<string, string> = {};
    if (!formData.projectName || !formData.description)
      return toast.warning("Project name and description is required.");
    // if (!formData.email) return (newErrors.email = "Email is required.");
    // if (!formData.description)
    //   return (newErrors.description = "Description is required.");
    // if (formData.noOfPeoples <= 0)
    //   return (newErrors.noOfPeoples =
    //     "Number of people must be greater than 0.");

    setErrors(newErrors);

    // If there are errors, do not proceed
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const res = await axios.post("/api/projects", {
            ...formData,
            orgId: selectedOrg?.id,
          });
          if (!res.data.success) {
            reject({ message: res.data.message });
          } else {
            resolve({ message: res.data.message });
          }
        } catch (error) {
          reject({
            message: "Failed to create Project. Something went wrong!",
          });
        }
      });

    toast.promise(promise, {
      loading: "Create project.....",
      success: (data: any) => {
        dispath(fetchProjects(selectedOrg?.id ?? ""));
        return data.message;
      },
      error: (err) => err,
    });
  };

  return (
    <div
      className={`flex justify-between w-full ${
        currentStepIndex === 1 ? "h-[600px] md:h-[550px]" : "h-[550px]"
      } w-11/12 max-w-4xl relative  rounded-lg border border-neutral-700 bg-[#262626] p-4`}
    >
      {!showSuccessMsg && (
        <SideBar currentStepIndex={currentStepIndex} goTo={goTo} />
      )}

      <main
        className={`${showSuccessMsg ? "w-full" : "w-full md:mt-5 md:w-[65%]"}`}
      >
        {showSuccessMsg ? (
          <AnimatePresence mode="wait">
            <SuccessMessage />
          </AnimatePresence>
        ) : (
          <form
            onSubmit={handleOnSubmit}
            className="w-full flex flex-col justify-between h-full border-3"
          >
            <AnimatePresence mode="wait">
              {currentStepIndex === 0 && (
                <ProjectInfoForm
                  key="step1"
                  {...formData}
                  updateForm={updateForm}
                  errors={errors}
                />
              )}
              {/* {currentStepIndex === 1 && (
                <TeamInfoForm
                  key="step2"
                  {...formData}
                  updateForm={updateForm}
                  errors={errors}
                />
              )} */}
              {currentStepIndex === 1 && <Summary key="step2" {...formData} />}
            </AnimatePresence>
            <div className="w-full items-center flex justify-between">
              <Button
                onClick={previousStep}
                type="button"
                variant="ghost"
                className={`${
                  isFirstStep
                    ? "invisible"
                    : "visible p-0 text-neutral-200 hover:text-white"
                }`}
              >
                Go Back
              </Button>
              {isLastStep ? (
                <Button
                  type="submit"
                  className="relative text-neutral-200 bg-neutral-900 border border-black/20 shadow-black/10 rounded-xl hover:bg-muted"
                >
                  Submit
                </Button>
              ) : (
                <button
                  onClick={nextStep}
                  className="relative text-neutral-200 bg-neutral-900 border border-black/20 shadow-black/10 rounded-xl hover:bg-muted inline-flex items-center justify-center gap-2 whitespace-nowrap p-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                >
                  Next Step
                </button>
              )}
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
