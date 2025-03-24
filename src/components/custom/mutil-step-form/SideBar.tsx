import { RoughNotation } from "react-rough-notation";

type NavProps = {
  currentStepIndex: number;
  goTo: (index: number) => void;
};

const steps = [
  { label: "Project Info", color: "#ffe666" },
  { label: "Team Info", color: "#bd284d" },
  { label: "Summary", color: "#6fe79f" },
];

const SideBar = ({ currentStepIndex, goTo }: NavProps) => {
  return (
    <div className="absolute -top-20 left-0 w-full md:w-[25%] md:relative md:top-0 md:left-0">
      <nav className="py-5 text-slate-200 bg-neutral-900 h-full rounded-md border border-neutral-700 md:p-5">
        <ul className="flex justify-center gap-2 md:flex-col">
          {steps.map((step, index) => (
            <li key={index} className="flex flex-col items-start font-medium">
              <span className="hidden text-neutral-500 uppercase text-sm md:flex">
                Step {index + 1}
              </span>
              <button
                tabIndex={0}
                onClick={() => goTo(index)}
                className={`text-sm ${
                  currentStepIndex === index
                    ? `text-[${step.color}]`
                    : "text-white"
                } md:text-base`}
              >
                <RoughNotation
                  type="underline"
                  show={currentStepIndex === index}
                  color={step.color}
                >
                  {step.label}
                </RoughNotation>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
