"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppDispatch, RootState } from "@/store";
import {
  fetchAllOrganisations,
  fetchOrgDetails,
  fetchProjects,
} from "@/store/slices/organisation/org-functions";
import { selectOrganization } from "@/store/slices/organisation/org-slice";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CheckOrganisationStatus = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { organisations, loading, selectedOrg, projects, tasks } = useSelector(
    (state: RootState) => state.org
  );

  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllOrganisations()).unwrap();
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (!loading && organisations !== null && organisations.length === 0) {
      router.push("/create-org");
    }
  }, [loading, organisations]);

  useEffect(() => {
    if (selectedOrgId) {
      const selectedOrgDetails = organisations?.find(
        (org) => org.id === selectedOrgId
      );
      if (selectedOrgDetails) {
        dispatch(selectOrganization(selectedOrgDetails));
      }
      dispatch(fetchOrgDetails(selectedOrgId));
      dispatch(fetchProjects(selectedOrgId));
    }
  }, [selectedOrgId, dispatch]);

  if (loading) return <p>Loading...</p>; // Ensures UI waits for data

  if (!organisations || organisations.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      <Select
        onValueChange={(value) => setSelectedOrgId(value)}
        value={selectedOrg?.id || undefined}
      >
        <SelectTrigger className="border-none w-[200px]">
          <SelectValue
            className="text-center border"
            placeholder={"Select Organisation"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {organisations.map((org) => (
              <SelectItem key={org.id} value={org.id}>
                {org.name}
              </SelectItem>
            ))}
          </SelectGroup>
          <Button
            variant={"secondary"}
            className="w-full mt-1 flex items-center gap-2"
            onClick={() => router.push("/create-org")}
          >
            <PlusIcon size={16} />
            Create Organisation
          </Button>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CheckOrganisationStatus;
