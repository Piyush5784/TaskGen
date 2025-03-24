"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const CheckOrganisationStatus = () => {
  const checkOrg = false;
  useEffect(() => {
    if (!checkOrg) {
      redirect("/create-org");
    }
  }, []);

  return <></>;
};

export default CheckOrganisationStatus;
