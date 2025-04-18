export type FormItems = {
  projectName: string;
  email: string;
  description: string;
  noOfPeoples: number;
  userEmails: string[];
  sendEmails: boolean;
};

export type StepProps = FormItems & {
  yearly: boolean;
  plan: string;
  addOns: [
    {
      checked: boolean;
      price: number;
      id: string;
      title: string;
    },
  ];
  goTo: (index: number) => void;
  updateForm?: (fieldToUpdate: Partial<FormItems>) => void;
};
