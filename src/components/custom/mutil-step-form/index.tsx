"use client";

import { Button } from "@/components/ui/button";
import { useMultiplestepForm } from "@/hooks/useMultiplestepForm";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import SideBar from "./SideBar";
import SuccessMessage from "./SuccessMessage";
import UserInfoForm from "./UserInfoForm";
import TeamInfoForm from "./team-info-form";
import Summary from "./Summary";

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

  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goTo,
    showSuccessMsg,
  } = useMultiplestepForm(3); // Updated to 3 steps

  function updateForm(fieldToUpdate: Partial<FormItems>) {
    setFormData((prev) => ({ ...prev, ...fieldToUpdate }));
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      return;
    }
    nextStep();
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
            className="w-full flex flex-col justify-between h-full"
          >
            <AnimatePresence mode="wait">
              {currentStepIndex === 0 && (
                <UserInfoForm
                  key="step1"
                  {...formData}
                  updateForm={updateForm}
                  errors={errors}
                />
              )}
              {currentStepIndex === 1 && (
                <TeamInfoForm
                  key="step2"
                  {...formData}
                  updateForm={updateForm}
                  errors={errors}
                />
              )}
              {currentStepIndex === 2 && <Summary key="step3" {...formData} />}
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
              <Button
                type="submit"
                className="relative text-neutral-200 bg-neutral-900 border border-black/20 shadow-black/10 rounded-xl hover:bg-muted"
              >
                {isLastStep ? "Confirm" : "Next Step"}
              </Button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
